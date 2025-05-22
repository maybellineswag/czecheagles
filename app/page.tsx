"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, Menu, Phone, Users, X } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FadeInSection = ({ children, delay = 0 }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <span>CZECH EAGLES MMA</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              O nás
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              Výhody
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-white transition-colors hover:text-green-500"
            >
              Reference
            </Link>
            <Link href="#trainers" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              Trenéři
            </Link>
            <Link href="#schedule" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              Rozvrh
            </Link>
            <Link href="#faq" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              FAQ
            </Link>
            <Link href="#contact" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              Kontakt
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Připojte se</Button>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-neutral-800"
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Link
                href="#about"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                O nás
              </Link>
              <Link
                href="#benefits"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Výhody
              </Link>
              <Link
                href="#testimonials"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reference
              </Link>
              <Link
                href="#trainers"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trenéři
              </Link>
              <Link
                href="#schedule"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rozvrh
              </Link>
              <Link
                href="#faq"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#contact"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 xl:py-48 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            >
              <source src="/6296160-hd_1080_1920_25fps.mp4" type="video/mp4" />
            </video>
          </div>
          <motion.div
            className="container px-4 md:px-6 z-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  TRÉNUJ. BOJUJ. VÍTĚZ.
                </h1>
                <p className="text-xl text-gray-300 md:text-2xl max-w-[800px] mx-auto">
                  Czech Eagles MMA nabízí špičkový trénink pro všechny úrovně dovedností. Připojte se k naší komunitě a
                  transformujte své tělo i mysl.
                </p>
              </div>
              <div className="pt-6">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6">
                  Rezervujte si první trénink ještě dnes
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="container px-4 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">O naší tělocvičně</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Czech Eagles MMA byla založena s posláním poskytovat vysoce kvalitní trénink bojových umění v
                    podpůrném prostředí. Naše špičkové zařízení se rozkládá na 1000 metrech čtverečních a zahrnuje
                    specializované tréninkové prostory pro údery, grappling a silový trénink.
                  </p>
                  <div className="flex flex-col items-center mt-6 space-y-4">
                    <p className="text-green-500 font-semibold text-lg">S podporou statutárního města Teplice</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-green-600 text-white hover:bg-green-700/20">
                          Zobrazit dokument
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] bg-neutral-900 border-green-600">
                        <DialogTitle className="sr-only">Dokument podpory města Teplice</DialogTitle>
                        <div className="relative w-full h-[600px]">
                          <Image
                            src="/document-image.jpg"
                            alt="Dokument podpory města Teplice"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Zdravotní výhody</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    MMA a grappling trénink nabízí řadu fyzických a duševních zdravotních výhod, které mohou změnit váš
                    život.
                  </p>
                  <p className="max-w-[900px] text-green-500 font-semibold md:text-xl mt-2">
                    Nemusíte být v kondici, abyste mohli začít — stačí přijít a my vás provedeme každým krokem.
                  </p>
                </div>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <FadeInSection delay={0.1}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[200px] flex flex-col px-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">Komplexní kondice</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4">
                    <p>
                      MMA trénink zapojuje všechny hlavní svalové skupiny, zlepšuje sílu, flexibilitu a kardiovaskulární
                      zdraví.
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[200px] flex flex-col px-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">Snížení stresu</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4">
                    <p>
                      Trénink uvolňuje endorfiny, které bojují proti stresu a úzkosti. Soustředění během cvičení pomáhá
                      vyčistit mysl.
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[200px] flex flex-col px-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">Zlepšená koordinace</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4">
                    <p>Grappling a úderové techniky zlepšují rovnováhu, prostorové vnímání a koordinaci oko-ruka.</p>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.4}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[200px] flex flex-col px-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">Dovednosti sebeobrany</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4">
                    <p>Naučte se praktické techniky, které vám pomohou chránit sebe sama a budovat sebevědomí.</p>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.5}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[200px] flex flex-col px-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">Disciplína a soustředění</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4">
                    <p>
                      Trénink bojových umění vštěpuje mentální disciplínu, která se přenáší do dalších oblastí života.
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.6}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[200px] flex flex-col px-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">Komunita a podpora</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4">
                    <p>Připojte se k podpůrné komunitě stejně smýšlejících lidí, kteří vás budou motivovat.</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="container px-4 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Co říkají naši členové</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Nevěřte jen našim slovům. Poslechněte si lidi, kteří s námi trénují každý den.
                  </p>
                </div>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <FadeInSection delay={0.1}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[350px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center text-white font-bold">
                        JN
                      </div>
                      <div>
                        <CardTitle className="text-white">Jan Novák</CardTitle>
                        <CardDescription className="text-gray-400">Člen 2 roky</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="italic">
                      "Když jsem poprvé přišel, byl jsem mimo formu a nervózní, ale trenéři mě od prvního dne přijali.
                      Teď jsem v nejlepší formě svého života a našel jsem si přátele na celý život. Czech Eagles MMA
                      změnilo můj život."
                    </p>
                    <div className="flex mt-4 text-yellow-500">
                      <span>★★★★★</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[350px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center text-white font-bold">
                        KP
                      </div>
                      <div>
                        <CardTitle className="text-white">Karolína Procházková</CardTitle>
                        <CardDescription className="text-gray-400">Členka 1 rok</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="italic">
                      "Jako žena jsem váhala s připojením k MMA tělocvičně, ale Czech Eagles byli neuvěřitelně vstřícní.
                      Dovednosti sebeobrany, které jsem se naučila, mi dodaly sebevědomí a tréninky jsou úžasné!"
                    </p>
                    <div className="flex mt-4 text-yellow-500">
                      <span>★★★★★</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Card className="bg-neutral-900 border-green-600 text-white h-[350px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center text-white font-bold">
                        MK
                      </div>
                      <div>
                        <CardTitle className="text-white">Martin Kovář</CardTitle>
                        <CardDescription className="text-gray-400">Člen 3 roky</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="italic">
                      "Trénoval jsem v několika tělocvičnách po celé Evropě a Czech Eagles MMA vyniká svým
                      profesionálním koučováním a přátelskou atmosférou. Technické instrukce jsou světové úrovně."
                    </p>
                    <div className="flex mt-4 text-yellow-500">
                      <span>★★★★★</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section id="trainers" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Profesionální trenéři</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Náš tým se skládá ze zkušených bojovníků a certifikovaných koučů, kteří se věnují vašemu pokroku a
                    bezpečnosti.
                  </p>
                </div>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <FadeInSection delay={0.1}>
                <Card className="overflow-hidden bg-neutral-900 border-green-600 text-white">
                  <div className="relative h-60 w-full">
                    <Image
                      src="/placeholder.svg?height=240&width=360"
                      fill
                      alt="Trenér Jakub"
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-green-500">Jakub Novotný</CardTitle>
                    <CardDescription className="text-gray-300">Hlavní MMA trenér</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Bývalý UFC zápasník s 15 lety profesionálních zkušeností. Černý pás v brazilském jiu-jitsu a
                      certifikovaný specialista na sílu a kondici.
                    </p>
                    <div className="flex items-center mt-4 space-x-2">
                      <span className="text-sm text-green-500 font-semibold">UFC veterán</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Card className="overflow-hidden bg-neutral-900 border-green-600 text-white">
                  <div className="relative h-60 w-full">
                    <Image
                      src="/placeholder.svg?height=240&width=360"
                      fill
                      alt="Trenérka Tereza"
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-green-500">Tereza Svobodová</CardTitle>
                    <CardDescription className="text-gray-300">Grappling specialistka</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Účastnice ADCC mistrovství světa s několika národními tituly. Hnědý pás v brazilském jiu-jitsu s
                      10 lety zkušeností s výukou.
                    </p>
                    <div className="flex items-center mt-4 space-x-2">
                      <span className="text-sm text-green-500 font-semibold">Národní šampionka</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Card className="overflow-hidden bg-neutral-900 border-green-600 text-white">
                  <div className="relative h-60 w-full">
                    <Image
                      src="/placeholder.svg?height=240&width=360"
                      fill
                      alt="Trenér David"
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-green-500">David Černý</CardTitle>
                    <CardDescription className="text-gray-300">Trenér úderů</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Bývalý profesionální Muay Thai bojovník s více než 20 zápasy. Certifikovaný v oblasti sportovní
                      výživy a technik prevence zranění.
                    </p>
                    <div className="flex items-center mt-4 space-x-2">
                      <span className="text-sm text-green-500 font-semibold">Muay Thai šampion</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section id="schedule" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="container px-4 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Týdenní rozvrh</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Nabízíme různé třídy během celého týdne, abychom vyhověli různým úrovním dovedností a časovým
                    rozvrhům.
                  </p>
                </div>
              </div>
            </FadeInSection>
            <div className="mt-12">
              <Tabs defaultValue="monday" className="w-full">
                <TabsList className="grid w-full grid-cols-7 bg-neutral-800">
                  <TabsTrigger value="monday" className="data-[state=active]:bg-green-600 text-white">
                    Po
                  </TabsTrigger>
                  <TabsTrigger value="tuesday" className="data-[state=active]:bg-green-600 text-white">
                    Út
                  </TabsTrigger>
                  <TabsTrigger value="wednesday" className="data-[state=active]:bg-green-600 text-white">
                    St
                  </TabsTrigger>
                  <TabsTrigger value="thursday" className="data-[state=active]:bg-green-600 text-white">
                    Čt
                  </TabsTrigger>
                  <TabsTrigger value="friday" className="data-[state=active]:bg-green-600 text-white">
                    Pá
                  </TabsTrigger>
                  <TabsTrigger value="saturday" className="data-[state=active]:bg-green-600 text-white">
                    So
                  </TabsTrigger>
                  <TabsTrigger value="sunday" className="data-[state=active]:bg-green-600 text-white">
                    Ne
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="monday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Pondělí
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Začátečnické MMA</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>6:00 - 7:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Pokročilý grappling</h4>
                          <p className="text-sm text-gray-400">2+ roky zkušeností</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>12:00 - 13:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Základy úderů</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>17:30 - 19:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Otevřená žíněnka</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>19:30 - 21:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="tuesday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Úterý
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Síla a kondice</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>6:00 - 7:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Brazilské jiu-jitsu</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>12:00 - 13:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">MMA sparring</h4>
                          <p className="text-sm text-gray-400">Středně pokročilí a pokročilí</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>18:00 - 20:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="wednesday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Středa
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Začátečnické MMA</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>6:00 - 7:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Základy zápasu</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>12:00 - 13:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Pokročilé MMA</h4>
                          <p className="text-sm text-gray-400">2+ roky zkušeností</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>18:00 - 20:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="thursday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Čtvrtek
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Síla a kondice</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>6:00 - 7:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Muay Thai</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>12:00 - 13:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">No-Gi Grappling</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>18:00 - 19:30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="friday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Pátek
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Začátečnické MMA</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>6:00 - 7:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Box</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>12:00 - 13:30</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Soutěžní trénink</h4>
                          <p className="text-sm text-gray-400">Pouze pokročilí</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>18:00 - 20:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="saturday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Sobota
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">MMA pro všechny úrovně</h4>
                          <p className="text-sm text-gray-400">Všechny úrovně vítány</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 11:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Otevřená žíněnka</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>12:00 - 14:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="sunday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center text-green-500">
                      <Calendar className="mr-2 h-5 w-5" /> Neděle
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Zavřeno</h4>
                          <p className="text-sm text-gray-400">Den odpočinku a regenerace</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-center mt-12">
              <FadeInSection>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Rezervujte si první lekci
                </Button>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Časté dotazy</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Odpovědi na nejčastější otázky o našem tréninku, členství a vybavení.
                  </p>
                </div>
              </div>
            </FadeInSection>
            <div className="mt-12 max-w-3xl mx-auto">
              <FadeInSection delay={0.1}>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Potřebuji předchozí zkušenosti s bojovými sporty?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Ne, vůbec ne. Naše lekce jsou navrženy pro všechny úrovně dovedností, včetně úplných začátečníků.
                      Naši trenéři vás provedou základy a postupně budou zvyšovat intenzitu, jak se budete zlepšovat.
                      Mnoho našich nejlepších bojovníků začínalo bez jakýchkoliv předchozích zkušeností.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Jaké vybavení potřebuji pro první trénink?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Pro první trénink stačí sportovní oblečení, ve kterém se můžete pohodlně pohybovat (tričko a
                      sportovní kraťasy), ručník a láhev s vodou. Pro grappling doporučujeme přiléhavější oblečení.
                      Pokud se rozhodnete pokračovat, poradíme vám s nákupem vhodného vybavení jako jsou rukavice,
                      chrániče nebo gi (kimono).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Jak často bych měl trénovat?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Pro začátečníky doporučujeme 2-3 tréninky týdně, což poskytuje dostatek času na regeneraci a
                      postupné budování kondice. Pokročilí bojovníci často trénují 4-6krát týdně. Nejdůležitější je
                      pravidelnost a konzistence. Naše členství vám umožňuje navštěvovat tolik tréninků, kolik
                      zvládnete.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Je MMA trénink bezpečný?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Bezpečnost je naší nejvyšší prioritou. Všechny tréninky jsou vedeny zkušenými trenéry, kteří
                      dohlížejí na správnou techniku a bezpečnost. Začátečníci se učí postupně a kontaktní sparring je
                      dobrovolný a přizpůsobený úrovni dovedností. Používáme kvalitní ochranné vybavení a dodržujeme
                      přísné bezpečnostní protokoly.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Jaké jsou možnosti členství a ceny?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Nabízíme několik typů členství podle vašich potřeb - od jednorázových vstupů přes měsíční až po
                      roční členství s výraznými slevami. Základní měsíční členství začíná na 1500 Kč a zahrnuje
                      neomezený přístup ke všem základním tréninkům. Pro přesné ceny a aktuální akce nás kontaktujte
                      nebo navštivte recepci tělocvičny.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Mohou trénovat i ženy a děti?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Absolutně! Naše tělocvična je otevřená pro všechny bez ohledu na pohlaví nebo věk. Máme speciální
                      programy pro ženy a děti od 6 let. MMA a grappling jsou skvělé pro budování sebevědomí, sebeobranu
                      a fyzickou kondici pro každého. Mnoho našich členek patří mezi naše nejlepší bojovníky.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Musím se účastnit soutěží?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Ne, účast na soutěžích je zcela dobrovolná. Většina našich členů trénuje pro fitness, sebeobranu a
                      zábavu. Pro ty, kteří mají zájem o soutěžní kariéru, máme specializovaný soutěžní tým a
                      poskytujeme potřebnou podporu a koučování. Respektujeme cíle každého člena.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Jak se mohu přihlásit na první trénink?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Můžete se přihlásit online přes náš rezervační systém, zavolat nám nebo nás jednoduše navštívit
                      osobně. První zkušební trénink je zdarma a není potřeba se předem registrovat. Doporučujeme přijít
                      asi 15 minut před začátkem tréninku, abyste měli čas se seznámit s prostředím a vyplnit krátký
                      registrační formulář.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FadeInSection>
              <div className="flex justify-center mt-12">
                <FadeInSection delay={0.2}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    Máte další otázky? Kontaktujte nás
                  </Button>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <FadeInSection>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                    Připraveni začít svou cestu?
                  </h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Navštivte naši tělocvičnu nebo nás kontaktujte pro více informací o našich programech a možnostech
                    členství.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-green-500" />
                      <span className="text-white">Bojovnická 123, Teplice, Česká republika</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-green-500" />
                      <span className="text-white">(+420) 123-456-789</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-green-500" />
                      <span className="text-white">Po-So: 5:30 - 21:30</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-white mb-4">Jak nás najít</h3>
                    <p className="text-gray-300 mb-2">
                      Nacházíme se v centru Teplic, jen 5 minut chůze od hlavního náměstí.
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      <li>Z autobusového nádraží jděte směrem k náměstí</li>
                      <li>Pokračujte na sever asi 200 m</li>
                      <li>Odbočte doprava na Bojovnickou ulici</li>
                      <li>Naše tělocvična je na levé straně, hledejte nápis Czech Eagles MMA</li>
                    </ul>
                    <p className="text-gray-300 mt-2">Parkování je k dispozici v podzemní garáži pod naší budovou.</p>
                  </div>
                  <div className="pt-4">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      Naplánujte si návštěvu
                    </Button>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Umístění tělocvičny"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-neutral-800 bg-black py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-white">
                <span>CZECH EAGLES MMA</span>
              </div>
              <p className="text-gray-400 text-sm">
                Profesionální MMA a grappling tělocvična v Teplicích. Nabízíme tréninky pro všechny úrovně dovedností.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-white text-sm">Bojovnická 123, Teplice, Česká republika</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-white text-sm">(+420) 123-456-789</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-white text-sm">Po-So: 5:30 - 21:30</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Rychlé odkazy</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#about" className="text-sm text-gray-400 hover:text-green-500">
                  O nás
                </Link>
                <Link href="#benefits" className="text-sm text-gray-400 hover:text-green-500">
                  Výhody
                </Link>
                <Link href="#testimonials" className="text-sm text-gray-400 hover:text-green-500">
                  Reference
                </Link>
                <Link href="#trainers" className="text-sm text-gray-400 hover:text-green-500">
                  Trenéři
                </Link>
                <Link href="#schedule" className="text-sm text-gray-400 hover:text-green-500">
                  Rozvrh
                </Link>
                <Link href="#faq" className="text-sm text-gray-400 hover:text-green-500">
                  FAQ
                </Link>
                <Link href="#contact" className="text-sm text-gray-400 hover:text-green-500">
                  Kontakt
                </Link>
              </nav>
              <div className="flex gap-4 pt-2">
                <Link href="#" className="text-sm font-medium text-gray-400 transition-colors hover:text-green-500">
                  Ochrana soukromí
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-400 transition-colors hover:text-green-500">
                  Podmínky služby
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Kontaktujte nás</h3>
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Jméno" className="bg-neutral-800 border-neutral-700 text-white text-sm h-9" />
                  <Input placeholder="Příjmení" className="bg-neutral-800 border-neutral-700 text-white text-sm h-9" />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
                />
                <Input
                  type="tel"
                  placeholder="Telefon"
                  className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
                />
                <select className="w-full px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-gray-400 text-sm h-9">
                  <option value="">Vyberte zájem</option>
                  <option value="mma">MMA trénink</option>
                  <option value="bjj">Brazilské Jiu-Jitsu</option>
                  <option value="boxing">Box</option>
                  <option value="muay-thai">Muay Thai</option>
                  <option value="wrestling">Zápas</option>
                </select>
                <Textarea
                  placeholder="Zpráva"
                  className="min-h-[80px] bg-neutral-800 border-neutral-700 text-white text-sm"
                />
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-9">
                  Odeslat
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-6 text-center">
            <p className="text-sm leading-loose text-gray-400">
              © {new Date().getFullYear()} Czech Eagles MMA. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
