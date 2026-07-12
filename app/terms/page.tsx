import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PolicyBlock } from "@/components/shared/policy-block"

export const metadata = {
    title: "Пользовательское соглашение — АИСТ",
    description: "Условия использования сайта и услуг АИСТ",
}

export default function TermsPage() {
    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-background">
                <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-20">

                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4-w-4" />
                        Вернуться на главную
                    </Link>


                    <h1 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">
                        Пользовательское соглашение
                    </h1>

                    <p className="mb-10 text-sm text-muted-foreground">
                        Дата вступления в силу: 11 июля 2026 г. · Версия 1.0
                    </p>


                    <div className="flex flex-col gap-6">


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                1. Общие положения
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Настоящее Пользовательское соглашение регулирует порядок
                                    использования сайта https://aist.life/ (далее — «Сайт»)
                                    и взаимодействия пользователей с Обществом с ограниченной
                                    ответственностью «ИМЕЙДЖН ИНРИАЛ» (далее — «Оператор»).
                                </p>

                                <p>
                                    Сайт представляет собой информационный ресурс, через который
                                    пользователи могут ознакомиться с услугами по организации
                                    мероприятий и оставить заявку на их проведение.
                                </p>

                                <p>
                                    Использование Сайта означает согласие Пользователя с настоящим
                                    соглашением, Политикой конфиденциальности и условиями обработки
                                    персональных данных.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                2. Услуги АИСТ
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    АИСТ оказывает услуги по организации мероприятий, включая:
                                </p>

                                <ul className="space-y-2 pl-6">

                                    <li className="list-disc">
                                        Организацию выписки из роддома
                                    </li>

                                    <li className="list-disc">
                                        Проведение гендер-пати
                                    </li>

                                    <li className="list-disc">
                                        Организацию детских и взрослых дней рождения
                                    </li>

                                </ul>

                                <p>
                                    В рамках выбранной услуги Оператор вправе предоставлять
                                    дополнительные услуги: оформление пространства, декор,
                                    подбор специалистов, фото- и видеосъёмку, развлекательные
                                    программы, услуги ведущих, аниматоров, создание праздничной
                                    продукции и другие услуги, необходимые для проведения мероприятия.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                3. Порядок оформления заявки
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Пользователь может оставить заявку следующими способами:
                                </p>

                                <ul className="space-y-2 pl-6">

                                    <li className="list-disc">
                                        Через форму обратной связи на Сайте
                                    </li>

                                    <li className="list-disc">
                                        Через мессенджеры Telegram и WhatsApp
                                    </li>

                                    <li className="list-disc">
                                        Посредством телефонного звонка
                                    </li>

                                    <li className="list-disc">
                                        Через официальные страницы и сообщения в социальных сетях,
                                        включая VK
                                    </li>

                                    <li className="list-disc">
                                        Через CRM-системы Оператора
                                    </li>

                                </ul>


                                <p>
                                    После получения заявки Оператор связывается с Пользователем,
                                    уточняет детали мероприятия, рассчитывает стоимость и согласовывает
                                    условия оказания услуг.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                4. Стоимость услуг и оплата
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Стоимость услуг определяется индивидуально и зависит от формата
                                    мероприятия, количества участников, выбранных услуг и используемых
                                    материалов.
                                </p>

                                <p>
                                    Итоговая стоимость согласовывается с Пользователем до начала
                                    оказания услуг.
                                </p>

                                <p>
                                    Оплата производится способами, согласованными сторонами.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                5. Обязанности Пользователя
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Пользователь обязуется:
                                </p>

                                <ul className="space-y-2 pl-6">

                                    <li className="list-disc">
                                        предоставлять достоверную информацию;
                                    </li>

                                    <li className="list-disc">
                                        сообщать об изменениях условий мероприятия;
                                    </li>

                                    <li className="list-disc">
                                        соблюдать согласованные сроки оплаты.
                                    </li>

                                </ul>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                6. Персональные данные
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Обработка персональных данных осуществляется в соответствии
                                    с{" "}
                                    <Link
                                        href="/privacy"
                                        className="text-black underline underline-offset-4"
                                    >
                                        Политикой конфиденциальности
                                    </Link>
                                    {" "}и Федеральным законом №152-ФЗ «О персональных данных».
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                7. Сторонние сервисы
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Для работы сайта, аналитики и улучшения качества обслуживания
                                    Оператор может использовать сторонние сервисы:
                                </p>

                                <ul className="space-y-2 pl-6">

                                    <li className="list-disc">
                                        Яндекс Метрика
                                    </li>

                                    <li className="list-disc">
                                        VK Pixel
                                    </li>

                                    <li className="list-disc">
                                        Telegram
                                    </li>

                                    <li className="list-disc">
                                        CRM-системы и сервисы обработки обращений
                                    </li>

                                </ul>

                                <p>
                                    Оператор вправе использовать иные технологические сервисы,
                                    необходимые для повышения качества работы сайта и обслуживания
                                    клиентов.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                8. Ответственность
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Оператор принимает необходимые меры для качественного оказания
                                    услуг, однако не несёт ответственность за действия сторонних
                                    подрядчиков, привлечённых к выполнению отдельных элементов мероприятия.
                                </p>

                                <p>
                                    Оператор не гарантирует конкретный эмоциональный результат
                                    мероприятия, поскольку восприятие услуг является индивидуальным.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                9. Реквизиты оператора
                            </h2>

                            <div className="space-y-3 text-sm text-neutral-700">

                                <p>
                                    <b>Полное наименование:</b><br />
                                    Общество с ограниченной ответственностью
                                    «ИМЕЙДЖН ИНРИАЛ»
                                </p>

                                <p>
                                    <b>ОГРН:</b> 1247700060178
                                </p>

                                <p>
                                    <b>ИНН:</b> 9705216816
                                </p>

                                <p>
                                    <b>Адрес:</b><br />
                                    119017, город Москва,<br />
                                    ул. Пятницкая, дом 37, помещение 1/1
                                </p>

                                <p>
                                    <b>Email:</b> hello@aist.life
                                </p>

                                <p>
                                    <b>Сайт:</b> www.aist.life
                                </p>

                            </div>

                        </PolicyBlock>


                    </div>

                </div>
            </main>


            <SiteFooter />
        </>
    )
}