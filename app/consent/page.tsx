import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PolicyBlock } from "@/components/shared/policy-block"

export const metadata = {
    title: "Согласие на обработку персональных данных — АИСТ",
    description: "Согласие на обработку персональных данных сервиса АИСТ",
}


export default function ConsentPage() {

    return (
        <>
            <SiteHeader />


            <main className="min-h-screen bg-background pt-28 pb-16">

                <div className="mx-auto max-w-3xl px-4 lg:px-8">


                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Вернуться на главную
                    </Link>



                    <h1 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">
                        Согласие на обработку персональных данных
                    </h1>


                    <p className="mb-10 text-sm text-muted-foreground">
                        Дата вступления в силу: 11 июля 2026 г.
                    </p>



                    <div className="flex flex-col gap-6">


                        <PolicyBlock>

                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                Согласие пользователя
                            </h2>


                            <div className="space-y-4 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Я, пользователь сайта aist.life, свободно, своей волей и в своем интересе
                                    даю согласие Обществу с ограниченной ответственностью «ИМЕЙДЖН ИНРИАЛ»
                                    на обработку моих персональных данных.
                                </p>


                                <p>
                                    Настоящее согласие предоставляется в целях обработки моего обращения,
                                    подготовки предложения по организации мероприятия, связи со мной,
                                    а также оказания услуг агентства «Аист».
                                </p>


                            </div>

                        </PolicyBlock>




                        <PolicyBlock>

                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                Перечень обрабатываемых данных
                            </h2>


                            <div className="space-y-4 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Оператор может обрабатывать следующие персональные данные:
                                </p>


                                <ul className="space-y-2 pl-6">

                                    <li className="list-disc">
                                        имя пользователя;
                                    </li>

                                    <li className="list-disc">
                                        номер телефона;
                                    </li>

                                    <li className="list-disc">
                                        адрес электронной почты;
                                    </li>

                                    <li className="list-disc">
                                        информация, указанная в заявке;
                                    </li>

                                    <li className="list-disc">
                                        технические данные сайта (cookies, IP-адрес,
                                        данные браузера и устройства).
                                    </li>

                                </ul>


                            </div>

                        </PolicyBlock>




                        <PolicyBlock>

                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                Порядок обработки данных
                            </h2>


                            <div className="space-y-4 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Обработка персональных данных осуществляется в соответствии
                                    с Политикой конфиденциальности и Федеральным законом
                                    №152-ФЗ «О персональных данных».
                                </p>


                                <p>
                                    Оператор использует полученные данные исключительно для
                                    связи с пользователем, подготовки предложения и организации
                                    услуг.
                                </p>


                            </div>

                        </PolicyBlock>




                        <PolicyBlock>

                            <h2 className="mb-4 text-lg font-extrabold text-black">
                                Срок действия согласия
                            </h2>


                            <div className="space-y-4 text-sm leading-relaxed text-neutral-700">

                                <p>
                                    Настоящее согласие действует до момента его отзыва пользователем.
                                </p>


                                <p>
                                    Для отзыва согласия необходимо направить обращение на электронную почту:
                                </p>


                                <p className="font-semibold text-black">
                                    hello@aist.life
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