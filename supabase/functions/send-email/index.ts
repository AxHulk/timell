const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'npm:zod@3.25.76'
import nodemailer from 'npm:nodemailer@6.10.1'

const EmailSchema = z.object({
  subject: z.string().min(1).max(255),
  html: z.string().min(1).max(50000),
  replyTo: z.string().email().optional(),
})

const SMTP_HOST = 'mail.timell.ru'
const SMTP_PORT = 465
const SMTP_USER = 'info@timell.ru'
const SMTP_FROM = 'Timell <info@timell.ru>'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const parsed = EmailSchema.safeParse(body)
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { subject, html, replyTo } = parsed.data
    const smtpPassword = Deno.env.get('SMTP_PASSWORD')
    if (!smtpPassword) {
      return new Response(
        JSON.stringify({ error: 'SMTP not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: smtpPassword,
      },
    })

    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_USER,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    })

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Email send error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
