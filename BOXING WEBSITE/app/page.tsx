"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
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

const FadeInSection = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

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
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1.1,
            delay,
            ease: [0.22, 1, 0.36, 1] // easeOutCubic
          }
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openBenefit, setOpenBenefit] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  // Contact form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Contact form handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    setFormError('')
    try {
      const res = await fetch('https://formspree.io/f/xaqdqglp', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget)
      })
      const data = await res.json()
      if (data.ok) {
        setFormStatus('success')
        setForm({ firstName: '', lastName: '', email: '', phone: '', interest: '', message: '' })
        setTimeout(() => {
          setModalOpen(false)
          setFormStatus('idle')
        }, 2000)
      } else {
        setFormStatus('error')
        setFormError(data?.errors?.[0]?.message || 'Nastala chyba při odesílání. Zkuste to prosím znovu.')
      }
    } catch (err) {
      setFormStatus('error')
      setFormError('Nastala chyba při odesílání. Zkuste to prosím znovu.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Contact Form Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-neutral-900 border-green-600 text-white max-w-md">
          <DialogTitle className="text-2xl font-bold text-green-500 mb-2">Kontaktujte nás</DialogTitle>
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-4 w-4 text-green-500" />
            <a href="tel:+420778425965" className="text-green-500 hover:underline font-semibold">
              +420 778 425 965
            </a>
          </div>
          <form className="space-y-3" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <Input
                name="firstName"
                value={form.firstName}
                onChange={handleFormChange}
                required
                placeholder="Jméno"
                className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
              />
              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleFormChange}
                required
                placeholder="Příjmení"
                className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
              />
            </div>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleFormChange}
              required
              placeholder="Email"
              className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
            />
            <Input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleFormChange}
              required
              placeholder="Telefon"
              className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
            />
            <select
              name="interest"
              value={form.interest}
              onChange={handleFormChange}
              required
              className="w-full px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-gray-400 text-sm h-9 appearance-none cursor-pointer"
              style={{ backgroundImage: 'none' }}
            >
              <option value="">Vyberte zájem</option>
              <option value="boxing">Skupinové tréninky boxu</option>
              <option value="private">Individuální trénink</option>
              <option value="kids">Box pro děti</option>
              <option value="fitness">Kondiční box</option>
            </select>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleFormChange}
              required
              placeholder="Zpráva"
              className="min-h-[80px] bg-neutral-800 border-neutral-700 text-white text-sm"
            />
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-9"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Odesílání...' : 'Odeslat'}
            </Button>
            {formStatus === 'success' && (
              <div className="text-green-500 text-sm pt-2">Děkujeme za zprávu! Ozveme se vám co nejdříve.</div>
            )}
            {formStatus === 'error' && (
              <div className="text-red-500 text-sm pt-2">{formError}</div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <header className="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center font-bold text-white px-2 py-1 md:px-0 md:py-0 whitespace-nowrap text-base sm:text-lg md:text-xl" style={{ lineHeight: 1 }}>
            <Image
              src="/velozo-arena-logo.svg"
              alt="Velozo Boxing Team Teplice - Arena 68"
              width={160}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </div>
          <nav className="hidden md:flex gap-6 ml-auto">
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
            <Link href="#pricing" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              Ceník
            </Link>
            <Link href="#faq" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              FAQ
            </Link>
            <Link href="#contact" className="text-sm font-medium text-white transition-colors hover:text-green-500">
              Kontakt
            </Link>
          </nav>
          <div className="flex items-center gap-4">
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
                href="#pricing"
                className="text-white py-2 hover:text-green-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ceník
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
        <section className="relative w-full py-20 sm:py-24 md:py-32 lg:py-40 xl:py-48 flex items-center justify-center overflow-hidden">
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
            className="max-w-7xl mx-auto px-12 sm:px-6 md:px-8 z-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/arena68-logo.svg"
                alt="Arena 68 Logo"
                width={120}
                height={30}
                className="mx-auto mb-4 filter invert brightness-0"
                style={{ filter: 'invert(1) brightness(100)' }}
                priority
              />
              <div className="space-y-2 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-tight sm:leading-tight md:leading-tight">
                  VELOZO TEAM BOXING
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-xs sm:max-w-[600px] md:max-w-[800px] mx-auto mt-4 sm:mt-2">
                  Jednou z hlavních priorit Velozo Teamu v teplickém areálu Arena 68 je vést mládež ke sportu a k disciplíně.
                </p>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => setModalOpen(true)} size="sm" className="bg-green-600 hover:bg-green-700 text-white w-auto mx-auto text-sm sm:text-base md:text-lg px-6 py-3 md:px-8 md:py-6 mt-4">
                  Rezervujte si první trénink ještě dnes
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">O naší tělocvičně</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Velozo Boxing nabízí špičkové boxerské tréninky v teplické části Prosetice. Náš moderní prostor v areálu Arena 68 o rozloze 1000 m² disponuje specializovanými zónami pro boxování na pytlích, sparingy i silový trénink.
                  </p>
                  <div className="flex flex-col items-center mt-6 space-y-4">
                    <p className="text-green-500 font-semibold text-lg">S podporou statutárního města Teplice</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-green-600 text-white hover:bg-green-700/20">
                          Zobrazit dokument
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] bg-neutral-900 border-green-600 p-4">
                        <DialogTitle className="text-white text-lg font-bold mb-4">Dokument podpory města Teplice</DialogTitle>
                        <div className="relative w-full aspect-[3/4]">
                          <Image
                            src="/document-image.jpg"
                            alt="Dokument podpory města Teplice"
                            fill
                            className="object-contain"
                            priority
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

        <section id="schedule" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
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
                    <h3 className="font-bold text-lg flex items-center text-green-500 uppercase italic">
                      <Calendar className="mr-2 h-5 w-5" /> Pondělí
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Otevřená tělocvična</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 20:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium text-green-500 uppercase italic font-bold text-lg">Box - děti</h4>
                          <p className="text-sm text-gray-400">Od 6 do 14 let</p>
                        </div>
                        <div className="flex items-center font-bold">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>16:00 - 17:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-green-500 uppercase italic font-bold text-lg">Box - dospělí</h4>
                          <p className="text-sm text-gray-400">Kadeti, junioři, dospělí</p>
                        </div>
                        <div className="flex items-center font-bold">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>19:00 - 20:30</span>
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
                    <h3 className="font-bold text-lg flex items-center text-green-500 uppercase italic">
                      <Calendar className="mr-2 h-5 w-5" /> Úterý
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Otevřená tělocvična</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 20:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium italic">Soukromé tréninky</h4>
                          <p className="text-sm text-gray-400">Dle individuální domluvy</p>
                        </div>
                        <div className="flex items-center text-green-500 font-bold">
                          <span>Celý den</span>
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
                    <h3 className="font-bold text-lg flex items-center text-green-500 uppercase italic">
                      <Calendar className="mr-2 h-5 w-5" /> Středa
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Otevřená tělocvična</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 20:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium text-green-500 uppercase italic font-bold text-lg">Box - děti</h4>
                          <p className="text-sm text-gray-400">Od 6 do 14 let</p>
                        </div>
                        <div className="flex items-center font-bold">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>16:00 - 17:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-green-500 uppercase italic font-bold text-lg">Box - dospělí</h4>
                          <p className="text-sm text-gray-400">Kadeti, junioři, dospělí</p>
                        </div>
                        <div className="flex items-center font-bold">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>19:00 - 20:30</span>
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
                    <h3 className="font-bold text-lg flex items-center text-green-500 uppercase italic">
                      <Calendar className="mr-2 h-5 w-5" /> Čtvrtek
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Otevřená tělocvična</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 20:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium italic">Soukromé tréninky</h4>
                          <p className="text-sm text-gray-400">Dle individuální domluvy</p>
                        </div>
                        <div className="flex items-center text-green-500 font-bold">
                          <span>Celý den</span>
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
                    <h3 className="font-bold text-lg flex items-center text-green-500 uppercase italic">
                      <Calendar className="mr-2 h-5 w-5" /> Pátek
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Otevřená tělocvična</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 20:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium text-green-500 uppercase italic font-bold text-lg">Box - děti</h4>
                          <p className="text-sm text-gray-400">Od 6 do 14 let</p>
                        </div>
                        <div className="flex items-center font-bold">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>16:00 - 17:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-green-500 uppercase italic font-bold text-lg">Box - dospělí</h4>
                          <p className="text-sm text-gray-400">Kadeti, junioři, dospělí</p>
                        </div>
                        <div className="flex items-center font-bold">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>19:00 - 20:30</span>
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
                    <h3 className="font-bold text-lg flex items-center text-green-500 uppercase italic">
                      <Calendar className="mr-2 h-5 w-5" /> Sobota
                    </h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                        <div>
                          <h4 className="font-medium">Otevřená tělocvična</h4>
                          <p className="text-sm text-gray-400">Všichni členové</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          <span>9:00 - 20:00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium italic">Soukromé tréninky</h4>
                          <p className="text-sm text-gray-400">Dle individuální domluvy</p>
                        </div>
                        <div className="flex items-center text-green-500 font-bold">
                          <span>Celý den</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="sunday"
                  className="border border-neutral-700 rounded-md mt-6 p-4 bg-neutral-900 text-white"
                >
                  <div className="space-y-4 text-center py-8">
                    <h3 className="font-bold text-xl text-green-500 uppercase italic mb-4">
                      Neděle
                    </h3>
                    <p className="text-gray-400 text-lg">
                      Zavřeno <br />
                      <span className="text-sm mt-2 block italic text-gray-500">(Soukromé tréninky po domluvě)</span>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-center mt-12">
              <Button onClick={() => setModalOpen(true)} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Rezervujte si první lekci
              </Button>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900 border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ceník tréninků</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Přehledný ceník našich boxerských lekcí v Arena 68.
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="hidden md:block">
                <table className="w-full text-left border-collapse border border-neutral-800">
                  <thead>
                    <tr className="bg-neutral-900 border-b border-neutral-800">
                      <th className="p-4 text-green-500 font-bold uppercase tracking-wider text-sm">Dny</th>
                      <th className="p-4 text-green-500 font-bold uppercase tracking-wider text-sm">Časy</th>
                      <th className="p-4 text-green-500 font-bold uppercase tracking-wider text-sm">1 Měsíc</th>
                      <th className="p-4 text-green-500 font-bold uppercase tracking-wider text-sm">1 Trénink</th>
                      <th className="p-4 text-green-500 font-bold uppercase tracking-wider text-sm">Skupina</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                      <td className="p-4">Pondělí, středa, pátek</td>
                      <td className="p-4">16:00 - 17:00</td>
                      <td className="p-4 font-bold text-green-500 text-lg">1000 Kč</td>
                      <td className="p-4 font-bold text-green-500 text-lg">150 Kč</td>
                      <td className="p-4">Děti box (od 6 do 14 let)</td>
                    </tr>
                    <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                      <td className="p-4">Pondělí, středa, pátek</td>
                      <td className="p-4">19:00 - 20:30</td>
                      <td className="p-4 font-bold text-green-500 text-lg">1500 Kč</td>
                      <td className="p-4 font-bold text-green-500 text-lg">150 Kč</td>
                      <td className="p-4">Kadeti, junioři, dospělí box (od 15 let)</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/50 transition-colors">
                      <td className="p-4">Každý den</td>
                      <td className="p-4">Dle domluvy</td>
                      <td className="p-4 font-bold text-green-500 text-lg whitespace-nowrap"></td>
                      <td className="p-4 font-bold text-green-500 text-lg">400 Kč</td>
                      <td className="p-4">Soukromý trénink (po domluvě s trenérem)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card-based Pricing */}
              <div className="md:hidden space-y-4">
                {[
                  {
                    title: "Děti box (6-14 let)",
                    days: "Po, St, Pá",
                    time: "16:00 - 17:00",
                    monthly: "1000 Kč",
                    single: "150 Kč"
                  },
                  {
                    title: "Kadeti, junioři, dospělí",
                    days: "Po, St, Pá",
                    time: "19:00 - 20:30",
                    monthly: "1500 Kč",
                    single: "150 Kč"
                  },
                  {
                    title: "Soukromý trénink",
                    days: "Každý den",
                    time: "Dle domluvy",
                    monthly: "-",
                    single: "400 Kč"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-black border border-neutral-800 p-5 rounded-xl">
                    <h3 className="text-green-500 font-bold text-lg mb-3 uppercase italic leading-tight">{item.title}</h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                      <div className="text-gray-400">Dny:</div>
                      <div className="text-white text-right">{item.days}</div>
                      <div className="text-gray-400">Časy:</div>
                      <div className="text-white text-right">{item.time}</div>
                      <div className="text-green-500 font-bold">1 Měsíc:</div>
                      <div className="text-green-500 font-bold text-right text-lg">{item.monthly}</div>
                      <div className="text-green-500 font-bold">1 Trénink:</div>
                      <div className="text-green-500 font-bold text-right text-lg">{item.single}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 max-w-2xl mx-auto">
                <p className="text-gray-300 text-lg mb-2">Pro soukromý trénink, kontaktujte nás na telefonním čísle:</p>
                <a href="tel:+420778425965" className="text-2xl font-black text-green-500 hover:underline">778 425 965</a>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="trainers" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Profesionální trenéři</h2>
                  <p className="max-w-2xl mx-auto text-gray-300 text-xl mt-2">
                    Náš tým se skládá ze zkušených boxerů a certifikovaných koučů, kteří se věnují vašemu pokroku a bezpečnosti.
                  </p>
                </div>
              </div>
            </FadeInSection>
            <div className="mt-12 flex flex-row items-center justify-center gap-3 sm:gap-8 max-w-4xl mx-auto px-2 sm:px-4 text-center">
              {/* Martin Polasek */}
              <div className="w-1/2 max-w-[170px] sm:max-w-[260px] flex flex-col rounded-xl border border-green-500/50 bg-black overflow-hidden shadow-2xl transition-all duration-300 hover:border-green-500 h-full">
                <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden">
                  <Image
                    src="/martin.png"
                    alt="Martin Polašek - Předseda spolků"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 260px"
                  />
                </div>
                <div className="flex flex-col p-3 sm:p-5 bg-neutral-900/50 flex-grow">
                  <div className="text-green-500 font-extrabold text-[11px] sm:text-base mb-0.5 tracking-tight uppercase italic md:not-italic md:normal-case">Martin Polašek</div>
                  <div className="text-gray-400 text-[9px] sm:text-xs mb-2 leading-tight">Předseda spolků</div>
                  <div className="mt-auto pt-2 border-t border-neutral-800 text-green-500 font-bold text-[9px] sm:text-xs flex items-center justify-center gap-1">
                    <Image src="/czech-flag.svg" alt="Czech flag" width={14} height={10} className="inline-block" />
                    <span className="hidden sm:inline">Atletický veterán</span>
                    <span className="sm:hidden text-[8px]">Veterán</span>
                  </div>
                </div>
              </div>

              {/* Miguel Velozo */}
              <div className="w-1/2 max-w-[170px] sm:max-w-[260px] flex flex-col rounded-xl border border-green-500/50 bg-black overflow-hidden shadow-2xl transition-all duration-300 hover:border-green-500 h-full">
                <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden">
                  <Image
                    src="/miguel.png"
                    alt="Miguel Velozo - Hlavní trenér boxu"
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 15%' }}
                    sizes="(max-width: 768px) 45vw, 260px"
                  />
                </div>
                <div className="flex flex-col p-3 sm:p-5 bg-neutral-900/50 flex-grow">
                  <div className="text-green-500 font-extrabold text-[11px] sm:text-base mb-0.5 tracking-tight uppercase italic md:not-italic md:normal-case">Miguel Velozo</div>
                  <div className="text-gray-400 text-[9px] sm:text-xs mb-2 leading-tight">Hlavní trenér boxu</div>
                  <div className="mt-auto pt-2 border-t border-neutral-800 text-green-500 font-bold text-[9px] sm:text-xs flex items-center justify-center gap-1">
                    <Image src="/cuba-flag.svg" alt="Cuba flag" width={14} height={10} className="inline-block" />
                    <span className="hidden sm:inline">Kubánská škola</span>
                    <span className="sm:hidden text-[8px]">Trenér</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Zdravotní výhody</h2>
                  <p className="max-w-[900px] text-gray-300 md:text-xl">
                    Boxerský trénink nabízí řadu fyzických a duševních zdravotních výhod, které mohou změnit váš život.
                  </p>
                </div>
              </div>
            </FadeInSection>
            {isMobile ? (
              <Accordion type="single" collapsible className="w-full mt-8">
                {[
                  {
                    title: "Komplexní kondice",
                    desc: "Boxerský trénink zapojuje celé tělo, extrémně zlepšuje fyzičku, sílu a vytrvalost."
                  },
                  {
                    title: "Snížení stresu",
                    desc: "Nic nevyčistí hlavu lépe než dobrý trénink na pytli. Box uvolňuje endorfiny a pomáhá zvládat každodenní stres."
                  },
                  {
                    title: "Zlepšená koordinace",
                    desc: "Boxerské techniky a práce nohou drasticky zlepšují postřeh, rovnováhu a koordinaci oko-ruka."
                  },
                  {
                    title: "Sebevědomí a sebeobrana",
                    desc: "Získání boxerských dovedností vám dodá pocit jistoty a naučí vás praktické základy sebeobrany."
                  },
                  {
                    title: "Disciplína a vůle",
                    desc: "Překonávání limitů v ringu vštěpuje mentální disciplínu a pevnou vůli, která se přenáší do běžného života."
                  },
                  {
                    title: "Komunita a respekt",
                    desc: "Staňte se součástí týmu, kde vládne vzájemný respekt a podpora, bez ohledu na úroveň vašich zkušeností."
                  }
                ].map((item, idx) => (
                  <AccordionItem value={`benefit-${idx}`} key={item.title} className="border-green-600">
                    <AccordionTrigger className="text-green-500 font-bold text-base leading-tight text-center w-full">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-white text-xs px-4">
                      {item.desc}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className={"md:grid md:grid-cols-3 md:gap-6 mt-8 md:mt-12 flex flex-col gap-2 md:flex-row"}>
                {[
                  {
                    title: "Komplexní kondice",
                    desc: "Boxerský trénink zapojuje celé tělo, extrémně zlepšuje fyzičku, sílu a vytrvalost."
                  },
                  {
                    title: "Snížení stresu",
                    desc: "Nic nevyčistí hlavu lépe než dobrý trénink na pytli. Box uvolňuje endorfiny a pomáhá zvládat každodenní stres."
                  },
                  {
                    title: "Zlepšená koordinace",
                    desc: "Boxerské techniky a práce nohou drasticky zlepšují postřeh, rovnováhu a koordinaci oko-ruka."
                  },
                  {
                    title: "Sebevědomí a sebeobrana",
                    desc: "Získání boxerských dovedností vám dodá pocit jistoty a naučí vás praktické základy sebeobrany."
                  },
                  {
                    title: "Disciplína a vůle",
                    desc: "Překonávání limitů v ringu vštěpuje mentální disciplínu a pevnou vůli, která se přenáší do běžného života."
                  },
                  {
                    title: "Komunita a respekt",
                    desc: "Staňte se součástí týmu, kde vládne vzájemný respekt a podpora, bez ohledu na úroveň vašich zkušeností."
                  }
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className="bg-black border-green-600 text-white rounded-md border min-h-[56px] md:min-h-[120px] py-3 md:py-4 px-2 md:px-4 flex flex-col justify-start items-center"
                  >
                    <div className="text-green-500 text-base md:text-lg font-bold leading-tight mb-1 text-center w-full">
                      {item.title}
                    </div>
                    <div className="text-xs md:text-base text-white text-center">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
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
            <div className="flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
              <FadeInSection delay={0.1}>
                <Card className="bg-neutral-900 border-green-600 text-white rounded-xl p-4">
                  <div className="flex gap-4">
                    <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      JN
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-white font-bold text-base">Jan Novák</h3>
                        <span className="text-gray-400 text-xs">Člen 2 roky</span>
                      </div>
                      <p className="italic text-sm text-gray-300 leading-relaxed mb-2">
                        "Když jsem poprvé přišel, byl jsem mimo formu a nervózní, ale trenéři mě od prvního dne přijali.
                        Teď jsem v nejlepší formě svého života a našel jsem si přátele na celý život. Velozo Boxing
                        změnilo můj život."
                      </p>
                      <div className="flex text-yellow-500 text-sm">
                        <span>★★★★★</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Card className="bg-neutral-900 border-green-600 text-white rounded-xl p-4">
                  <div className="flex gap-4">
                    <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      KP
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-white font-bold text-base">Kateřina Pospíšilová</h3>
                        <span className="text-gray-400 text-xs">Členka 1 rok</span>
                      </div>
                      <p className="italic text-sm text-gray-300 leading-relaxed mb-2">
                        "Jako žena jsem váhala s připojením k boxerské tělocvičně, ale ve Velozo Boxing byli neuvěřitelně vstřícní.
                        Dovednosti sebeobrany, které jsem se naučila, mi dodaly sebevědomí a tréninky jsou úžasné!"
                      </p>
                      <div className="flex text-yellow-500 text-sm">
                        <span>★★★★★</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Card className="bg-neutral-900 border-green-600 text-white rounded-xl p-4">
                  <div className="flex gap-4">
                    <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      MK
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-white font-bold text-base">Martin Kovář</h3>
                        <span className="text-gray-400 text-xs">Člen 3 roky</span>
                      </div>
                      <p className="italic text-sm text-gray-300 leading-relaxed mb-2">
                        "Trénoval jsem v několika tělocvičnách po celé Evropě a Velozo Boxing vyniká svým
                        profesionálním koučováním a přátelskou atmosférou. Technické instrukce jsou světové úrovně."
                      </p>
                      <div className="flex text-yellow-500 text-sm">
                        <span>★★★★★</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInSection>
            </div>
          </div>
        </section>


        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
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
                      Potřebuji předchozí zkušenosti s boxem?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Ne, vůbec ne. Naše lekce jsou navrženy pro všechny úrovně dovedností, včetně úplných začátečníků.
                      Naši trenéři vás provedou základy boxu a postupně budou zvyšovat intenzitu, jak se budete zlepšovat.
                      Mnoho našich nejlepších boxerů začínalo bez jakýchkoliv předchozích zkušeností.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Jaké vybavení potřebuji pro první trénink?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Pro první trénink stačí sportovní oblečení, ve kterém se můžete pohodlně pohybovat (tričko a
                      sportovní kraťasy), čistá sálová obuv, ručník a láhev s vodou. Pokud se rozhodnete pokračovat,
                      poradíme vám s nákupem vhodného vybavení jako jsou vlastní boxerské rukavice, bandáže a chránič zubů.
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
                      Je boxerský trénink bezpečný?
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
                      Jaké jsou možnosti členství?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Nabízíme několik typů členství podle vašich potřeb – od jednorázových vstupů přes měsíční až po
                      zvýhodněné dlouhodobé členství. Naše programy vám umožňují navštěvovat tréninky tak často, jak vám vyhovuje.
                      Pro více informací o možnostech registrace nás kontaktujte nebo navštivte recepci tělocvičny.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6" className="border-b border-neutral-700">
                    <AccordionTrigger className="text-white hover:text-green-500 py-4">
                      Mohou trénovat i ženy a děti?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      Absolutně! Naše tělocvična je otevřená pro všechny bez ohledu na pohlaví nebo věk. Máme speciální
                      programy pro ženy a děti od 6 let. Box je skvělý pro budování sebevědomí, sebeobranu a fyzickou
                      kondici pro každého. Mnoho našich členek patří mezi naše nejlepší boxery.
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
                <Button onClick={() => setModalOpen(true)} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Máte další otázky? Kontaktujte nás
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="max-w-7xl mx-auto px-12 md:px-6">
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
                      <MapPin className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-white text-sm">Pražská 1268/121, Teplice 415 01</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 text-sm font-semibold">Velozo Team, spolek, IČ 063 65 639</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-white text-sm">+420 603 586 073</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-white text-sm">Po-So: 9:00 - 20:00</span>
                    </div>
                    {/* Social links under opening hours */}
                    <div className="flex flex-col gap-2 mt-2 mb-4">
                      <a href="https://t.me/velozoteam" target="_blank" rel="noopener noreferrer" className="flex items-center group text-sm">
                        <svg className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21.944 4.667a1.5 1.5 0 0 0-1.7-1.1C17.1 4.2 6.1 8.1 2.3 9.5a1.5 1.5 0 0 0-.1 2.8l3.2 1.1 2.2 6.7a1.5 1.5 0 0 0 2.3.8l3.1-2.3 3.2 2.3a1.5 1.5 0 0 0 2.3-.8l3.2-13.1a1.5 1.5 0 0 0-.1-1.1zM9.7 16.2l-2-6.1 8.7-3.5-6.7 9.6zm1.2 1.1l6.7-9.6 2.1 8.7-8.8.9zm-7.2-7.7c3.7-1.3 14.7-5.3 17.9-6.1a.5.5 0 0 1 .6.4l-3.2 13.1a.5.5 0 0 1-.8.3l-3.2-2.3-3.1 2.3a.5.5 0 0 1-.8-.3l-2.2-6.7-3.2-1.1a.5.5 0 0 1-.2-.7z" /></svg>
                        <span className="text-white">velozoteam</span>
                      </a>
                      <a href="https://facebook.com/velozoteam" target="_blank" rel="noopener noreferrer" className="flex items-center group text-sm">
                        <svg className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                        <span className="text-white">velozoteam</span>
                      </a>
                      <a href="https://www.instagram.com/team_velozo/" target="_blank" rel="noopener noreferrer" className="flex items-center group text-sm">
                        <svg className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1.5" fill="currentColor" /></svg>
                        <span className="text-white">team_velozo</span>
                      </a>
                    </div>
                  </div>
                  <div className="my-4">
                    <Image
                      src="/arena68-logo.svg"
                      alt="Arena 68 Logo"
                      width={120}
                      height={30}
                      style={{ filter: 'invert(1) brightness(100)' }}
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Jak nás najít</h3>
                    <p className="text-gray-300 mb-2">
                      Nacházíme se v Proseticích v areálu Arena 68.
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      <li>Po vjezdu do areálu Arena 68, jedete rovně.</li>
                      <li>Doprava</li>
                      <li>Doleva</li>
                      <li>Naše tělocvična je na pravé straně, hledejte nápis Velozo Boxing</li>
                    </ul>
                    <p className="text-gray-300 mt-2">Parkování je k dispozici před naší budovou.</p>
                  </div>
                  <div className="pt-4">
                    <Button onClick={() => setModalOpen(true)} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      Naplánujte si návštěvu
                    </Button>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                  <iframe
                    title="Mapa - Arena 68 Teplice (Google Maps)"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5622356614126!2d13.845072999999998!3d50.6352486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47098ee4de984c87%3A0xf84337bf1847255c!2sArena%2068!5e0!3m2!1scs!2scz!4v1770862383270!5m2!1scs!2scz"
                    width="100%"
                    height="100%"
                    style={{ border: 0, width: '100%', height: '100%' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-neutral-800 bg-black py-5">
        <div className="w-full bg-black py-6 flex flex-wrap justify-center items-center gap-8 mt-0">
          <Image src="/logos/karsit.svg" alt="Karsit" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
          <Image src="/logos/farmalogo.svg" alt="Farma" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
          <Image src="/logos/brochierlogo.svg" alt="Brochier" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
          <Image src="/logos/penaxlogo.svg" alt="Penax" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
          <Image src="/logos/lupekovlogo.svg" alt="Lupekov" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
          <Image src="/logos/armexlogo.svg" alt="Armex" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
          <Image src="/logos/cistobox.svg" alt="Cistobox" height={48} width={120} style={{ height: '48px', width: 'auto', maxWidth: '120px' }} className="object-contain" />
        </div>
        <div className="max-w-7xl mx-auto px-12 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-white">
                <Image
                  src="/velozo-arena-logo.svg"
                  alt="Velozo Team Logo"
                  width={180}
                  height={60}
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Profesionální boxerský klub v Teplicích. Box pro děti, dospělé i soukromé tréninky s Miguelem Velozem.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-white text-sm">Pražská 1268/121, Teplice 415 01</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-sm font-semibold">Velozo Team, spolek, IČ 063 65 639</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-white text-sm">+420 603 586 073</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-white text-sm">Po-So: 9:00 - 20:00</span>
                </div>
                {/* Social links under opening hours */}
                <div className="flex flex-col gap-2 mt-2 mb-4">
                  <a href="https://t.me/velozoteam" target="_blank" rel="noopener noreferrer" className="flex items-center group text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21.944 4.667a1.5 1.5 0 0 0-1.7-1.1C17.1 4.2 6.1 8.1 2.3 9.5a1.5 1.5 0 0 0-.1 2.8l3.2 1.1 2.2 6.7a1.5 1.5 0 0 0 2.3.8l3.1-2.3 3.2 2.3a1.5 1.5 0 0 0 2.3-.8l3.2-13.1a1.5 1.5 0 0 0-.1-1.1zM9.7 16.2l-2-6.1 8.7-3.5-6.7 9.6zm1.2 1.1l6.7-9.6 2.1 8.7-8.8.9zm-7.2-7.7c3.7-1.3 14.7-5.3 17.9-6.1a.5.5 0 0 1 .6.4l-3.2 13.1a.5.5 0 0 1-.8.3l-3.2-2.3-3.1 2.3a.5.5 0 0 1-.8-.3l-2.2-6.7-3.2-1.1a.5.5 0 0 1-.2-.7z" /></svg>
                    <span className="text-white">velozoteam</span>
                  </a>
                  <a href="https://facebook.com/velozoteam" target="_blank" rel="noopener noreferrer" className="flex items-center group text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                    <span className="text-white">velozoteam</span>
                  </a>
                  <a href="https://www.instagram.com/team_velozo/" target="_blank" rel="noopener noreferrer" className="flex items-center group text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1.5" fill="currentColor" /></svg>
                    <span className="text-white">team_velozo</span>
                  </a>
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
                <Link href="#pricing" className="text-sm text-gray-400 hover:text-green-500">
                  Ceník
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
              <form id="contact-form" className="space-y-3" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-2">
                  <Input name="firstName" value={form.firstName} onChange={handleFormChange} required placeholder="Jméno" className="bg-neutral-800 border-neutral-700 text-white text-sm h-9" />
                  <Input name="lastName" value={form.lastName} onChange={handleFormChange} required placeholder="Příjmení" className="bg-neutral-800 border-neutral-700 text-white text-sm h-9" />
                </div>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Email"
                  className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
                />
                <Input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="Telefon"
                  className="bg-neutral-800 border-neutral-700 text-white text-sm h-9"
                />
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-gray-400 text-sm h-9 appearance-none cursor-pointer"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="">Vyberte zájem</option>
                  <option value="boxing">Skupinové tréninky boxu</option>
                  <option value="private">Individuální trénink</option>
                  <option value="kids">Box pro děti</option>
                  <option value="fitness">Kondiční box</option>
                </select>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  placeholder="Zpráva"
                  className="min-h-[80px] bg-neutral-800 border-neutral-700 text-white text-sm"
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-9"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Odesílání...' : 'Odeslat'}
                </Button>
                {formStatus === 'success' && (
                  <div className="text-green-500 text-sm pt-2">Děkujeme za zprávu! Ozveme se vám co nejdříve.</div>
                )}
                {formStatus === 'error' && (
                  <div className="text-red-500 text-sm pt-2">{formError}</div>
                )}
              </form>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-6 text-center">
            <p className="text-sm leading-loose text-gray-400">
              Velozo Team, spolek, IČ 063 65 639 © Arena68 2023. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
