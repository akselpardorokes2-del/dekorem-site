"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─────────────── LOGO AMBLEM ─────────────── */
function DekoremEmblem({ size = 72, color = "#E8752A" }) {
  return (
    <svg
      width={size}
      height={size * (133 / 122)}
      viewBox="0 0 122 133"
      fill="none"
      aria-hidden="true"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M39.75 10.83c1.31-.02 2.63-.07 3.94-.04 5.8.13 11.09 2.08 15.88 5.27 6.06 4.03 10.53 9.52 14.01 15.82 4.17 7.53 6.78 15.67 8.61 24.07 1.82 8.37 2.85 16.87 3.46 25.42.42 5.88.58 11.77.54 17.67-.01 1.87-.14 3.75-.22 5.62-.01.38-.12.62-.56.72-5.28 1.27-10.6 2.33-16.02 2.85-5.68.54-11.35.61-16.97-.48-6.78-1.31-12.54-4.36-17.21-9.38-5.08-5.46-8.24-12-10.39-19.08-2.76-9.12-4.04-18.49-4.61-27.98C19.7 43.9 19.7 36.49 20.3 29.1c.37-4.55.93-9.07 2.11-13.47.54-2.01 1.26-3.93 2.53-5.56.06-.08.12-.18.25-.17-.05.32-.1.64-.16.96-.78 4.74-1.15 9.53-1.26 14.35-.17 7.54.29 15.04 1.23 22.51 1.17 9.24 3.13 18.28 6.65 26.93 2.49 6.12 5.67 11.77 10.38 16.35 3.38 3.29 7.24 5.67 11.77 6.82 1.58.4 3.2.49 4.81.57 1.12.06 1.14.04 1.16-1.08.09-6.48-.17-12.94-.72-19.38-.72-8.38-1.92-16.68-3.87-24.85-1.84-7.72-4.22-15.24-7.68-22.36-2.72-5.6-6.01-10.81-10.53-15.08-1.06-1-2.19-1.92-3.4-2.73-.21-.14-.44-.36-.66-.18-.24.2-.04.46.05.68.84 1.98 1.78 3.93 2.48 5.96 2.69 7.84 3.8 15.96 4.15 24.22.29 6.94.02 13.86-.82 20.75-.66 5.41-1.65 10.73-3.41 15.87-.27.79-.6 1.56-.92 2.33-.07.17-.09.45-.35.42-.27-.03-.17-.3-.18-.47-.1-1.87-.24-3.73-.3-5.6-.21-7.03.01-14.04.68-21.04.87-9.06 2.36-17.98 5.1-26.65 1.52-4.82 3.38-9.49 5.92-13.84.29-.5.62-.98.95-1.46.04-.06.06-.17.18-.14z"
      />
    </svg>
  );
}

/* ─────────────── NAVBAR ─────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-3 group">
        <DekoremEmblem size={18} color={scrolled ? "#E8752A" : "#E8752A"} />
        <span
          className={`font-jost font-light text-sm tracking-[0.32em] group-hover:opacity-75 transition-all duration-500 ${
            scrolled ? "text-navy" : "text-white"
          }`}
        >
          dekorem
        </span>
      </Link>
      <div className="flex items-center gap-10">
        {[
          { label: "Ürünler", href: "/urunler" },
          { label: "Hakkımızda", href: "#hakkimizda" },
          { label: "İletişim", href: "#iletisim" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`font-sans text-xs tracking-[0.18em] uppercase transition-colors duration-500 ${
              scrolled
                ? "text-navy/50 hover:text-navy"
                : "text-white/55 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────── ANIMATE ON SCROLL ─────────────── */
function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────── STATS BAR ─────────────── */
function StatsBar() {
  const stats = [
    { number: "30+", label: "Yıllık Deneyim" },
    { number: "120+", label: "Renk & Desen" },
    { number: "28", label: "Ülkeye İhracat" },
    { number: "600+", label: "Mutlu Müşteri" },
  ];

  return (
    <section className="relative -mt-1 z-20">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_8px_60px_rgba(27,32,100,0.08)] mx-6 md:mx-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-navy/5">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1} className="py-8 md:py-10 text-center">
                <div className="font-cormorant text-3xl md:text-4xl font-semibold text-orange">
                  {s.number}
                </div>
                <div className="font-sans text-xs tracking-[0.14em] text-navy/45 mt-2 uppercase">
                  {s.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── HAKKIMIZDA ─────────────── */
function Hakkimizda() {
  return (
    <section id="hakkimizda" className="py-28 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-orange">
            Hakkımızda
          </span>
          <h2 className="font-cormorant text-3xl md:text-[2.65rem] font-light text-navy mt-4 leading-tight">
            1995'ten Bu Yana <br className="hidden md:block" />
            <span className="italic text-orange">Yüzeylere</span> Değer Katıyoruz
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Sol: Görsel placeholder */}
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-navy/5 to-navy/10 rounded-xl overflow-hidden flex items-center justify-center">
                <div className="text-center text-navy/25">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs tracking-wider uppercase">Fabrika Görseli</p>
                </div>
              </div>
              {/* Accent bar */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-orange/10 rounded-xl -z-10" />
            </div>
          </FadeIn>

          {/* Sağ: Metin */}
          <FadeIn delay={0.2}>
            <p className="font-sans text-navy/65 leading-[1.9] text-[0.95rem]">
              Dekorem, 1995 yılında İstanbul'da kurulmuş, PVC yüzey kaplama sektörünün
              öncü firmalarından biridir. 30 yılı aşkın tecrübemizle, mobilya ve iç mimari
              sektörüne 120'den fazla renk ve desende yüzey kaplama çözümleri sunuyoruz.
            </p>
            <p className="font-sans text-navy/65 leading-[1.9] text-[0.95rem] mt-5">
              Hyundai L&C ve diğer dünya markalarının Türkiye distribütörü olarak,
              28 ülkeye ihracat yapıyor ve 600'ü aşkın müşterimize hizmet veriyoruz.
              Kalite, güven ve yenilik — işimizin temelini oluşturur.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-px bg-orange" />
              <span className="font-cormorant italic text-navy/40 text-lg">
                Zambak Sk. No:8, Dikilitaş / İstanbul
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── ÖNE ÇIKAN ÜRÜNLER ─────────────── */
function OeneCikanUrunler() {
  const urunler = [
    { ad: "Ceviz Doğal", kod: "WN-401", renk: "from-amber-800 to-amber-900" },
    { ad: "Meşe Altın", kod: "OK-205", renk: "from-amber-600 to-amber-700" },
    { ad: "Antrasit Mat", kod: "MT-102", renk: "from-gray-700 to-gray-800" },
    { ad: "Beyaz Parlak", kod: "HG-001", renk: "from-gray-100 to-white" },
    { ad: "Siyah Mat", kod: "MT-301", renk: "from-gray-900 to-black" },
    { ad: "Krem Bej", kod: "SL-108", renk: "from-amber-100 to-amber-200" },
    { ad: "Koyu Ceviz", kod: "WN-505", renk: "from-amber-950 to-amber-900" },
    { ad: "Gri Beton", kod: "CN-203", renk: "from-gray-400 to-gray-500" },
  ];

  return (
    <section className="py-28 md:py-36 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-orange">
            Koleksiyon
          </span>
          <h2 className="font-cormorant text-3xl md:text-[2.65rem] font-light text-navy mt-4">
            Öne Çıkan <span className="italic text-orange">Desenler</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {urunler.map((u, i) => (
            <FadeIn key={u.kod} delay={i * 0.06}>
              <div className="group cursor-pointer">
                <div
                  className={`aspect-square rounded-xl bg-gradient-to-br ${u.renk} shadow-sm group-hover:shadow-lg group-hover:scale-[1.03] transition-all duration-500 relative overflow-hidden`}
                >
                  {/* Grain overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors duration-500 flex items-center justify-center">
                    <span className="font-sans text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      İncele
                    </span>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <p className="font-sans text-sm text-navy/80 font-medium">{u.ad}</p>
                  <p className="font-sans text-[11px] text-navy/35 mt-0.5">{u.kod}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="text-center mt-14">
          <Link
            href="/urunler"
            className="inline-flex items-center gap-3 px-10 py-3.5 bg-navy text-white font-sans text-xs tracking-[0.22em] uppercase rounded-full hover:bg-navy/85 transition-colors"
          >
            Tüm Ürünleri Gör
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────── KATEGORİLER ─────────────── */
function Kategoriler() {
  const cats = [
    { ad: "Ahşap Desenler", aciklama: "Doğal ahşap görünümlü premium PVC kaplamalar", ikon: "🪵" },
    { ad: "Düz Renkler", aciklama: "Sade ve şık tek renk yüzey kaplamaları", ikon: "◼️" },
    { ad: "High Gloss", aciklama: "Ultra parlak, ayna etkili yüzeyler", ikon: "✨" },
    { ad: "Mat Serisi", aciklama: "Yumuşak dokunuşlu mat kaplamalar", ikon: "🌑" },
    { ad: "Primer / Alman", aciklama: "Endüstriyel kalitede primer kaplamalar", ikon: "🇩🇪" },
    { ad: "PET-G Serisi", aciklama: "Yeni nesil sürdürülebilir yüzeyler", ikon: "♻️" },
  ];

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-orange">
            Kategoriler
          </span>
          <h2 className="font-cormorant text-3xl md:text-[2.65rem] font-light text-navy mt-4">
            Ürün <span className="italic text-orange">Aileleri</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {cats.map((c, i) => (
            <FadeIn key={c.ad} delay={i * 0.08}>
              <Link
                href="/urunler"
                className="group block p-8 rounded-xl border border-navy/[0.06] hover:border-orange/20 hover:shadow-[0_4px_40px_rgba(232,117,42,0.08)] transition-all duration-500"
              >
                <span className="text-3xl">{c.ikon}</span>
                <h3 className="font-cormorant text-xl text-navy mt-5 group-hover:text-orange transition-colors">
                  {c.ad}
                </h3>
                <p className="font-sans text-xs text-navy/40 mt-2 leading-relaxed">
                  {c.aciklama}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── NEDEN BİZ ─────────────── */
function NedenBiz() {
  const items = [
    { baslik: "30+ Yıl Tecrübe", aciklama: "1995'ten beri sektörün güvenilir adresi" },
    { baslik: "Hyundai L&C Distribütör", aciklama: "Dünya markalarının Türkiye temsilcisi" },
    { baslik: "28 Ülkeye İhracat", aciklama: "Avrupa'dan Orta Doğu'ya global erişim" },
    { baslik: "120+ Renk Seçeneği", aciklama: "Her mekana uygun geniş renk yelpazesi" },
    { baslik: "Hızlı Teslimat", aciklama: "Stoktan anında, özel siparişte hızlı üretim" },
    { baslik: "Teknik Destek", aciklama: "Uzman ekibimizle uygulama desteği" },
  ];

  return (
    <section className="py-28 md:py-36 bg-navy relative overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-orange">
            Neden Dekorem
          </span>
          <h2 className="font-cormorant text-3xl md:text-[2.65rem] font-light text-white mt-4">
            Bizi <span className="italic text-orange">Farklı</span> Kılan
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <FadeIn key={item.baslik} delay={i * 0.08}>
              <div className="p-7 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-500">
                <div className="w-8 h-px bg-orange mb-5" />
                <h3 className="font-cormorant text-lg text-white">{item.baslik}</h3>
                <p className="font-sans text-xs text-white/35 mt-2 leading-relaxed">
                  {item.aciklama}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── İLETİŞİM CTA ─────────────── */
function IletisimCTA() {
  return (
    <section id="iletisim" className="py-28 md:py-36 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-orange">
            İletişim
          </span>
          <h2 className="font-cormorant text-3xl md:text-[2.65rem] font-light text-navy mt-4 leading-tight">
            Projeniz İçin <br className="hidden md:block" />
            <span className="italic text-orange">Yanınızdayız</span>
          </h2>
          <p className="font-sans text-navy/50 mt-6 text-[0.95rem] leading-relaxed max-w-md mx-auto">
            Renk seçimi, teknik detaylar veya fiyat bilgisi için bize ulaşın.
            Uzman ekibimiz en kısa sürede size dönüş yapacaktır.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/902122276316?text=Merhaba%2C%20Dekorem%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-white font-sans text-xs tracking-[0.18em] uppercase rounded-full hover:bg-[#20bd5a] transition-colors shadow-[0_4px_20px_rgba(37,211,102,0.25)]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.49-.646-6.34-1.768l-.455-.277-2.642.886.886-2.642-.277-.455A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
          {/* Email */}
          <a
            href="mailto:info@dekorem.com.tr?subject=Ürün%20Bilgi%20Talebi"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-navy text-white font-sans text-xs tracking-[0.18em] uppercase rounded-full hover:bg-navy/85 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            E-posta Gönder
          </a>
          {/* Telefon */}
          <a
            href="tel:+902122276316"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-navy/15 text-navy/70 font-sans text-xs tracking-[0.18em] uppercase rounded-full hover:border-navy/30 hover:text-navy transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Ara
          </a>
        </FadeIn>

        <FadeIn delay={0.25} className="mt-10">
          <p className="font-sans text-navy/30 text-xs">
            Zambak Sk. No:8, Dikilitaş, Beşiktaş / İstanbul &nbsp;·&nbsp; +90 212 227 63 16
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer className="bg-navy py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <DekoremEmblem size={16} />
              <span className="font-jost font-light text-white text-sm tracking-[0.32em]">
                dekorem
              </span>
            </div>
            <p className="font-cormorant italic text-white/25 text-sm">
              Yüzeylere Karakter, Mekanlara Hayat
            </p>
          </div>

          {/* Linkler */}
          <div className="flex gap-16">
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
                Sayfalar
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Ana Sayfa", href: "/" },
                  { label: "Ürünler", href: "/urunler" },
                  { label: "İletişim", href: "#iletisim" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="font-sans text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
                İletişim
              </h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:info@dekorem.com.tr" className="font-sans text-xs text-white/40 hover:text-white transition-colors">
                  info@dekorem.com.tr
                </a>
                <a href="tel:+902122276316" className="font-sans text-xs text-white/40 hover:text-white transition-colors">
                  +90 212 227 63 16
                </a>
                <a
                  href="https://dekorem.tahsildar.com.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-orange/60 hover:text-orange transition-colors"
                >
                  Online Ödeme →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-white/20">
            © 2025 Dekorem Ltd. Tüm hakları saklıdır.
          </p>
          <p className="font-sans text-[11px] text-white/15">
            Zambak Sk. No:8, Dikilitaş, Beşiktaş / İstanbul
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ ANA SAYFA ═══════════════ */
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-screen bg-navy flex flex-col items-center justify-center relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_35%,#1B2064_100%)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="flex flex-col items-center gap-6 mb-10">
            <DekoremEmblem size={90} />
            <span className="font-jost font-light text-white tracking-[0.6em] text-4xl md:text-[2.75rem] leading-none">
              dekorem
            </span>
          </div>
          <div className="w-12 h-px bg-orange mb-10" />
          <h1 className="font-cormorant font-light italic text-white/80 text-2xl md:text-[1.75rem] lg:text-[2rem] leading-relaxed mb-12 max-w-sm md:max-w-md">
            Yüzeylere Karakter, Mekanlara Hayat
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/urunler"
              className="px-10 py-3.5 bg-orange text-white font-sans text-xs tracking-[0.22em] uppercase rounded-full hover:bg-[#d4671f] transition-colors min-w-[210px] text-center"
            >
              Ürünleri Keşfet
            </Link>
            <Link
              href="#iletisim"
              className="px-10 py-3.5 border border-white/30 text-white/80 font-sans text-xs tracking-[0.22em] uppercase rounded-full hover:border-white/65 hover:text-white hover:bg-white/5 transition-all min-w-[210px] text-center"
            >
              İletişime Geç
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2.5 text-white/25 animate-bounce">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
            <path d="M1 1L9 9L17 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      <StatsBar />
      <Hakkimizda />
      <OeneCikanUrunler />
      <Kategoriler />
      <NedenBiz />
      <IletisimCTA />
      <Footer />
    </>
  );
}
