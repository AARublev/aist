import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PolicyBlock } from "@/components/shared/policy-block"

export const metadata = {
    title: "Политика конфиденциальности — АИСТ",
    description: "Политика обработки персональных данных сервиса АИСТ",
}

export default function PrivacyPage() {
    return (
        <>
            <SiteHeader  />

            <main className="min-h-screen bg-background">
                <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-20">

                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Вернуться на главную
                    </Link>

                    <h1 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">
                        Политика конфиденциальности
                    </h1>

                    <p className="mb-10 text-sm text-muted-foreground">
                        Дата вступления в силу: 11 июля 2026 г.
                    </p>


                    <div className="flex flex-col gap-6">


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                1. Общие положения
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Настоящая Политика конфиденциальности определяет порядок обработки
                                    персональных данных пользователей сайта aist.life.
                                </p>

                                <p>
                                    Оператором персональных данных является Общество с ограниченной
                                    ответственностью «ИМЕЙДЖН ИНРИАЛ», осуществляющее деятельность
                                    под брендом «АИСТ».
                                </p>

                                <p>
                                    Политика разработана в соответствии с Федеральным законом
                                    от 27.07.2006 №152-ФЗ «О персональных данных».
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                2. Какие данные мы собираем
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    При обращении через сайт пользователь может предоставить:
                                </p>

                                <ul className="space-y-2 pl-6">
                                    <li className="list-disc">Имя</li>
                                    <li className="list-disc">Номер телефона</li>
                                    <li className="list-disc">Адрес электронной почты</li>
                                    <li className="list-disc">Информацию о желаемом мероприятии</li>
                                    <li className="list-disc">Дополнительные сведения для подготовки предложения</li>
                                </ul>

                                <p>
                                    Автоматически могут собираться:
                                </p>

                                <ul className="space-y-2 pl-6">
                                    <li className="list-disc">IP-адрес</li>
                                    <li className="list-disc">данные cookies</li>
                                    <li className="list-disc">тип браузера и устройства</li>
                                    <li className="list-disc">источник перехода на сайт</li>
                                </ul>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                3. Цели обработки данных
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <ul className="space-y-2 pl-6">

                                    <li className="list-disc">
                                        Обработка заявок пользователей
                                    </li>

                                    <li className="list-disc">
                                        Связь с клиентом для подготовки мероприятия
                                    </li>

                                    <li className="list-disc">
                                        Организация праздников и дополнительных услуг
                                    </li>

                                    <li className="list-disc">
                                        Улучшение качества обслуживания
                                    </li>

                                    <li className="list-disc">
                                        Ведение аналитики и статистики
                                    </li>

                                    <li className="list-disc">
                                        Направление информационных сообщений при наличии согласия
                                    </li>

                                </ul>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                4. Передача данных третьим лицам
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Оператор не продаёт и не распространяет персональные данные.
                                </p>

                                <p>
                                    Для организации мероприятий данные могут передаваться подрядчикам,
                                    участвующим в оказании услуг: ведущим, аниматорам, фотографам,
                                    декораторам и другим специалистам.
                                </p>

                                <p>
                                    Также Оператор может использовать CRM-системы, сервисы аналитики,
                                    коммуникации и иные технологические решения для обработки обращений
                                    и улучшения качества обслуживания.
                                </p>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                5. Использование cookies
                            </h2>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Сайт использует cookies для корректной работы,
                                    анализа посещаемости и улучшения пользовательского опыта.
                                </p>

                                <p>
                                    На сайте могут использоваться сервисы:
                                </p>

                                <ul className="space-y-2 pl-6">
                                    <li className="list-disc">Яндекс Метрика</li>
                                    <li className="list-disc">VK Pixel</li>
                                    <li className="list-disc">CRM-сервисы</li>
                                </ul>

                            </div>
                        </PolicyBlock>


                        <PolicyBlock>
                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                6. Реквизиты оператора
                            </h2>

                            <div className="space-y-3 text-sm text-neutral-700">

                                <p>
                                    <b>Полное наименование:</b><br />
                                    ООО «ИМЕЙДЖН ИНРИАЛ»
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
                                    <b>Email:</b>{" "}
                                    hello@aist.life
                                </p>

                                <p>
                                    <b>Сайт:</b>{" "}
                                    aist.life
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