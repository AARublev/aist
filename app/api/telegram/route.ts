import { NextResponse } from 'next/server'


type CallbackPayload = {
  kind: 'callback'
  name: string
  phone: string
}


type RequestPayload = {
  kind: 'request'
  occasion?: string
  date?: string
  budget?: string
  phone: string
}


type ServicePayload = {
  kind: 'service'
  service: string
  date?: string
  phone: string
}


type ContactPayload = {
  kind: 'contact'
  name: string
  phone: string
  occasion?: string
}


type MaternityPayload = {
  kind: 'maternity'
  occasion?: string
  dueStatus?: string
  date?: string
  name?: string
  phone: string
}


type Payload =
  | CallbackPayload
  | RequestPayload
  | ServicePayload
  | ContactPayload
  | MaternityPayload



export async function POST(request: Request) {

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID


  if (!token || !chatId) {

    console.error('Telegram env missing')

    return NextResponse.json(
      {
        error: 'Telegram is not configured'
      },
      {
        status: 500
      }
    )
  }



  let payload: Payload


  try {

    payload = await request.json()

  } catch {

    return NextResponse.json(
      {
        error: 'Invalid JSON'
      },
      {
        status: 400
      }
    )

  }



  if (!payload?.phone) {

    return NextResponse.json(
      {
        error: 'Phone required'
      },
      {
        status: 400
      }
    )

  }



  let text = ''



  switch (payload.kind) {


    case 'callback':

      text = [
        '📞 <b>Заказ обратного звонка</b>',
        '',
        `Имя: ${escapeHtml(payload.name)}`,
        `Телефон: ${escapeHtml(payload.phone)}`
      ].join('\n')

      break



    case 'request':

      text = [
        '🎉 <b>Заявка на праздник</b>',
        '',
        payload.occasion
          ? `Повод: ${escapeHtml(payload.occasion)}`
          : null,

        payload.date
          ? `Дата: ${escapeHtml(payload.date)}`
          : null,

        payload.budget
          ? `Бюджет: ${escapeHtml(payload.budget)}`
          : null,

        `Телефон: ${escapeHtml(payload.phone)}`

      ]
        .filter(Boolean)
        .join('\n')

      break




    case 'service':

      text = [
        '💰 <b>Расчёт стоимости услуги</b>',
        '',
        `Услуга: ${escapeHtml(payload.service)}`,

        payload.date
          ? `Дата: ${escapeHtml(payload.date)}`
          : null,

        `Телефон: ${escapeHtml(payload.phone)}`

      ]
        .filter(Boolean)
        .join('\n')

      break




    case 'contact':

      text = [
        '✅ <b>Заявка с формы контактов</b>',
        '',

        `Имя: ${escapeHtml(payload.name)}`,

        payload.occasion
          ? `Повод: ${escapeHtml(payload.occasion)}`
          : null,

        `Телефон: ${escapeHtml(payload.phone)}`

      ]
        .filter(Boolean)
        .join('\n')

      break




    case 'maternity':

      text = [
        '👶 <b>Заявка из роддома (QR)</b>',
        '',

        payload.occasion
          ? `Что планируют: ${escapeHtml(payload.occasion)}`
          : null,


        payload.dueStatus
          ? `Когда малыш: ${escapeHtml(payload.dueStatus)}`
          : null,


        payload.date
          ? `Дата: ${escapeHtml(payload.date)}`
          : null,


        payload.name
          ? `Имя: ${escapeHtml(payload.name)}`
          : null,


        `Телефон: ${escapeHtml(payload.phone)}`

      ]
        .filter(Boolean)
        .join('\n')


      break




    default:

      return NextResponse.json(
        {
          error: 'Unknown kind'
        },
        {
          status:400
        }
      )

  }



  try {


    const controller = new AbortController()

    const timeout = setTimeout(
      () => controller.abort(),
      10000
    )



    const telegramResponse = await fetch(

      `https://api.telegram.org/bot${token}/sendMessage`,

      {

        method:'POST',

        headers:{
          'Content-Type':'application/json'
        },

        body:JSON.stringify({

          chat_id:chatId,

          text,

          parse_mode:'HTML'

        }),

        signal:controller.signal

      }

    )


    clearTimeout(timeout)



    if (!telegramResponse.ok) {


      const errorText = await telegramResponse.text()


      console.error(
        'Telegram API error:',
        errorText
      )


      return NextResponse.json(

        {
          error:errorText
        },

        {
          status:502
        }

      )

    }




    return NextResponse.json({

      ok:true

    })



  } catch(error:any) {


    console.error(
      'Telegram connection error:',
      error?.message || error
    )


    return NextResponse.json(

      {
        error:'Telegram connection failed'
      },

      {
        status:500
      }

    )

  }

}




function escapeHtml(value:string) {

  return value
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')

}