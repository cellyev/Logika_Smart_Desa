import { createErrorResponse } from '@/utils/createResponse/CreateErrorResponse'
import { SendOTPSchema } from '@/validators/validationFormat/auth/SendOTPSchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { generateSecureOTP } from '@/utils/auth/generateOTP'
import { sendOTPEmail } from '@/utils/sendMail/sendOTPEmail'
import { createSuccessResponse } from '@/utils/createResponse/CreateSuccessResponse'

export const POST = async (req: Request) => {
  const payload = await getPayload({ config: configPromise })
  try {
    const body = await req.json()

    const parsedData = SendOTPSchema.safeParse(body)
    if (!parsedData.success) {
      return createErrorResponse(
        'Input tidak valid. Silakan periksa data yang dikirim.',
        400,
        parsedData.error.flatten().fieldErrors,
      )
    }

    const warga = await payload.find({
      collection: 'warga',
      where: {
        email: { equals: parsedData.data.email },
      },
    })

    if (warga.docs.length === 0) {
      return createErrorResponse('Email tidak ditemukan.', 400)
    }

    const isVerfiedEmail = warga.docs[0].email_terverifikasi
    if (isVerfiedEmail) {
      return createErrorResponse('Email sudah terverifikasi.', 400)
    }

    const isOtpExist = warga.docs[0].kode_otp_email
    const lastSent = warga.docs[0].last_otp_sent_at
    const now = new Date()

    if (isOtpExist && lastSent) {
      const elapsed = now.getTime() - new Date(lastSent).getTime()
      if (elapsed < 60 * 1000) {
        return createErrorResponse('Silakan tunggu 1 menit sebelum meminta OTP lagi.', 429)
      }
    }

    const lockedUntil = warga.docs[0].email_otp_locked_until
    if (lockedUntil && new Date(lockedUntil) > now) {
      return createErrorResponse('Akun sedang dikunci. Silakan coba lagi nanti.', 429)
    }

    const demografiWarga = await payload.find({
      collection: 'demografi_warga',
      where: {
        warga: { equals: warga.docs[0].id },
      },
    })
    const namaLengkap = demografiWarga.docs[0]?.nama_lengkap ?? 'Warga'

    const otp = generateSecureOTP()

    const data = await payload.update({
      collection: 'warga',
      id: warga.docs[0].id,
      depth: 0,
      data: {
        kode_otp_email: otp.otp,
        otp_email_expired_at: otp.expiresAt,
        last_otp_sent_at: now.toISOString(),
        email_otp_attempts: 0,
        email_otp_locked_until: null,
      },
    })

    try {
      await sendOTPEmail({
        email: parsedData.data.email,
        otp: otp.otp,
        nama: namaLengkap,
      })
    } catch (e) {
      try {
        await payload.update({
          collection: 'warga',
          id: warga.docs[0].id,
          data: {
            kode_otp_email: null,
            otp_email_expired_at: null,
            last_otp_sent_at: null,
            email_otp_attempts: 0,
            email_otp_locked_until: null,
          },
        })
      } catch (rollbackError) {
        console.error('Gagal rollback data OTP:', rollbackError)
      }

      console.error('Gagal mengirim email:', e)
      return createErrorResponse('Gagal mengirim email OTP. Silakan coba lagi.', 500)
    }

    return createSuccessResponse('Kode OTP berhasil dikirim.')
  } catch (error: any) {
    console.error('Terjadi kesalahan: ', error)
    return createErrorResponse(error.message || 'Terjadi kesalahan internal server!', 500)
  }
}
