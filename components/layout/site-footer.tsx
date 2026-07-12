import Link from 'next/link'
import { Stork } from '@/components/decor'

export function SiteFooter() {
  return (
    <footer className="bg-background px-4 py-10">

      <div className="mx-auto max-w-6xl">


        <div className="flex flex-col items-center justify-between gap-8 border-b border-border pb-8 md:flex-row md:items-start">


          {/* Логотип */}
          <div className="text-center md:text-left">

            <div className="flex items-center justify-center gap-2 md:justify-start">

              <span className="flex size-9 items-center justify-center">
                <Stork className="w-9 text-primary" />
              </span>

              <span className="font-display text-xl font-bold text-foreground">
                Аист
              </span>

            </div>


            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Событийное агентство праздников. Создаём тёплые моменты под ключ с 2021 года
            </p>

          </div>



          {/* Услуги */}
          <nav className="flex flex-col items-center gap-2 md:items-start">

            <span className="mb-1 text-sm font-semibold text-foreground">
              Услуги
            </span>


            <a
              href="/#services"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Выписка из роддома
            </a>


            <a
              href="/#services"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Гендер-пати
            </a>


            <a
              href="/#services"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Дни рождения
            </a>


          </nav>




          {/* Контакты */}
          <div className="flex flex-col items-center gap-2 md:items-end">


            <span className="mb-1 text-sm font-semibold text-foreground">
              Контакты
            </span>


            <a
              href="tel:+79040003458"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              +7 (904) 000-34-58
            </a>


            <a
              href="mailto:hello@aist.life"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              hello@aist.life
            </a>


            <span className="text-muted-foreground">
              Москва и область
            </span>


          </div>


        </div>




        {/* Нижняя строка */}
        <div className="mt-6 flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">


          <p>
            © {new Date().getFullYear()} Агентство «Аист». Все права защищены.
          </p>




          <nav className="flex flex-wrap justify-center gap-6 md:justify-end">


            <Link
              href="/privacy"
              className="transition-colors hover:text-primary"
            >
              Политика конфиденциальности
            </Link>


            <Link
              href="/consent"
              className="transition-colors hover:text-primary"
            >
              Согласие на обработку данных
            </Link>


            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
              Пользовательское соглашение
            </Link>


          </nav>


        </div>


      </div>


    </footer>
  )
}