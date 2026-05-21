"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ─────────────── LOGO AMBLEM ─────────────── */
function DekoremEmblem({ size = 72, color = "#E8752A" }) {
  return (
    <svg width={size} height={size * (133 / 122)} viewBox="0 0 122 133" fill="none" aria-hidden="true">
      <path fill={color} fillRule="evenodd" d="M39.75 10.83c1.31-.02 2.63-.07 3.94-.04 5.8.13 11.09 2.08 15.88 5.27 6.06 4.03 10.53 9.52 14.01 15.82 4.17 7.53 6.78 15.67 8.61 24.07 1.82 8.37 2.85 16.87 3.46 25.42.42 5.88.58 11.77.54 17.67-.01 1.87-.14 3.75-.22 5.62-.01.38-.12.62-.56.72-5.28 1.27-10.6 2.33-16.02 2.85-5.68.54-11.35.61-16.97-.48-6.78-1.31-12.54-4.36-17.21-9.38-5.08-5.46-8.24-12-10.39-19.08-2.76-9.12-4.04-18.49-4.61-27.98C19.7 43.9 19.7 36.49 20.3 29.1c.37-4.55.93-9.07 2.11-13.47.54-2.01 1.26-3.93 2.53-5.56.06-.08.12-.18.25-.17-.05.32-.1.64-.16.96-.78 4.74-1.15 9.53-1.26 14.35-.17 7.54.29 15.04 1.23 22.51 1.17 9.24 3.13 18.28 6.65 26.93 2.49 6.12 5.67 11.77 10.38 16.35 3.38 3.29 7.24 5.67 11.77 6.82 1.58.4 3.2.49 4.81.57 1.12.06 1.14.04 1.16-1.08.09-6.48-.17-12.94-.72-19.38-.72-8.38-1.92-16.68-3.87-24.85-1.84-7.72-4.22-15.24-7.68-22.36-2.72-5.6-6.01-10.81-10.53-15.08-1.06-1-2.19-1.92-3.4-2.73-.21-.14-.44-.36-.66-.18-.24.2-.04.46.05.68.84 1.98 1.78 3.93 2.48 5.96 2.69 7.84 3.8 15.96 4.15 24.22.29 6.94.02 13.86-.82 20.75-.66 5.41-1.65 10.73-3.41 15.87-.27.79-.6 1.56-.92 2.33-.07.17-.09.45-.35.42-.27-.03-.17-.3-.18-.47-.1-1.87-.24-3.73-.3-5.6-.21-7.03.01-14.04.68-21.04.87-9.06 2.36-17.98 5.1-26.65 1.52-4.82 3.38-9.49 5.92-13.84.29-.5.62-.98.95-1.46.04-.06.06-.17.18-.14z"/>
    </svg>
  );
}

/* ─────────────── NAVBAR ─────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(27,32,100,0.06)]" : "bg-transparent"}`}>
      <Link href="/" className="flex items-center gap-2.5 group">
        <DekoremEmblem size={20} color="#E8752A" />
        <span className={`font-jost font-light text-[0.82rem] tracking-[0.32em] transition-colors duration-700 ${scrolled ? "text-navy" : "text-white"}`}>
          dekorem
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-10">
        {[{ label: "Ürünler", href: "/urunler" }, { label: "Hakkımızda", href: "#hakkimizda" }, { label: "İletişim", href: "#iletisim" }].map((item) => (
          <Link key={item.label} href={item.href} className={`font-sans text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-700 ${scrolled ? "text-navy/40 hover:text-navy" : "text-white/45 hover:text-white"}`}>
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
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─────────────── COUNTER HOOK ─────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.unobserve(el); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(target);
    if (isNaN(num)) return;
    let start = 0;
    const step = Math.max(1, Math.floor(num / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { ref, count, started };
}

/* ─────────────── STATS BAR ─────────────── */
function StatsBar() {
  const stats = [
    { number: "30", suffix: "+", label: "Yıllık Deneyim", sublabel: "1995'ten beri" },
    { number: "120", suffix: "+", label: "Renk & Desen", sublabel: "Geniş koleksiyon" },
    { number: "28", suffix: "", label: "Ülkeye İhracat", sublabel: "Global erişim" },
    { number: "600", suffix: "+", label: "Mutlu Müşteri", sublabel: "Güvenilir hizmet" },
  ];

  return (
    <section className="relative z-20 -mt-16 mb-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-[0_12px_60px_rgba(27,32,100,0.10)] border border-navy/[0.04]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => {
              const { ref, count, started } = useCounter(s.number);
              return (
                <div key={s.label} ref={ref} className={`py-8 md:py-10 text-center ${i < stats.length - 1 ? "border-r border-navy/[0.04]" : ""} ${i < 2 ? "border-b md:border-b-0 border-navy/[0.04]" : ""}`}>
                  <div className="font-cormorant text-3xl md:text-[2.6rem] font-semibold text-orange leading-none">
                    {started ? count : 0}{s.suffix}
                  </div>
                  <div className="font-sans text-[0.7rem] tracking-[0.16em] text-navy/60 mt-2.5 uppercase font-medium">
                    {s.label}
                  </div>
                  <div className="font-sans text-[0.6rem] text-navy/25 mt-1">
                    {s.sublabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── HAKKIMIZDA ─────────────── */
function Hakkimizda() {
  return (
    <section id="hakkimizda" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-orange/80 font-medium">Hakkımızda</span>
          <h2 className="font-cormorant text-[2rem] md:text-[2.7rem] font-light text-navy mt-4 leading-[1.2]">
            1995&apos;ten Bu Yana<br className="hidden md:block" />
            <span className="italic text-orange">Yüzeylere</span> Değer Katıyoruz
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-navy/[0.03] to-navy/[0.07] rounded-xl overflow-hidden flex items-center justify-center border border-navy/[0.04]">
                <div className="text-center text-navy/20">
                  <svg className="w-14 h-14 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase">Fabrika Görseli</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-orange/[0.06] rounded-xl -z-10" />
              <div className="absolute -top-3 -left-3 w-12 h-12 border border-orange/10 rounded-lg -z-10" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-sans text-navy/55 leading-[2] text-[0.92rem]">
              Dekorem, 1995 yılında İstanbul&apos;da kurulmuş, PVC yüzey kaplama sektörünün
              öncü firmalarından biridir. 30 yılı aşkın tecrübemizle, mobilya ve iç mimari
              sektörüne 120&apos;den fazla renk ve desende yüzey kaplama çözümleri sunuyoruz.
            </p>
            <p className="font-sans text-navy/55 leading-[2] text-[0.92rem] mt-5">
              Hyundai L&C ve diğer dünya markalarının Türkiye distribütörü olarak,
              28 ülkeye ihracat yapıyor ve 600&apos;ü aşkın müşterimize hizmet veriyoruz.
              Kalite, güven ve yenilik — işimizin temelini oluşturur.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-px bg-orange/60" />
              <span className="font-cormorant italic text-navy/30 text-[1.05rem]">Zambak Sk. No:8, Dikilitaş / İstanbul</span>
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
    { ad: "Ceviz Doğal", kod: "WN-401", renk: "from-amber-800 to-amber-950", type: "ahsap" },
    { ad: "Meşe Altın", kod: "OK-205", renk: "from-amber-600 to-amber-800", type: "ahsap" },
    { ad: "Antrasit Mat", kod: "MT-102", renk: "from-gray-600 to-gray-800", type: "mat" },
    { ad: "Beyaz Parlak", kod: "HG-001", renk: "from-gray-50 to-gray-200", type: "hg" },
    { ad: "Siyah Mat", kod: "MT-301", renk: "from-gray-800 to-gray-950", type: "mat" },
    { ad: "Krem Bej", kod: "SL-108", renk: "from-amber-100 to-orange-100", type: "duz" },
    { ad: "Koyu Ceviz", kod: "WN-505", renk: "from-amber-900 to-amber-950", type: "ahsap" },
    { ad: "Gri Beton", kod: "CN-203", renk: "from-gray-300 to-gray-500", type: "duz" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-orange/80 font-medium">Koleksiyon</span>
          <h2 className="font-cormorant text-[2rem] md:text-[2.7rem] font-light text-navy mt-4">
            Öne Çıkan <span className="italic text-orange">Desenler</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {urunler.map((u, i) => (
            <FadeIn key={u.kod} delay={i * 0.05}>
              <div className="group cursor-pointer">
                <div className={`aspect-square rounded-xl bg-gradient-to-br ${u.renk} relative overflow-hidden shadow-sm group-hover:shadow-xl group-hover:scale-[1.03] transition-all duration-700`}>
                  {/* Wood grain texture for ahsap */}
                  {u.type === "ahsap" && (
                    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 9px)` }} />
                  )}
                  {/* Shimmer for HG */}
                  {u.type === "hg" && <div className="absolute inset-0 shimmer" />}
                  {/* Hover */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-500 flex items-center justify-center">
                    <span className="font-sans text-white text-[0.65rem] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">İncele</span>
                  </div>
                </div>
                <div className="mt-3 px-0.5">
                  <p className="font-sans text-[0.82rem] text-navy/75 font-medium">{u.ad}</p>
                  <p className="font-sans text-[0.65rem] text-navy/30 mt-0.5 tracking-wider">{u.kod}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="text-center mt-12">
          <Link href="/urunler" className="inline-flex items-center gap-3 px-10 py-3.5 bg-navy text-white font-sans text-[0.68rem] tracking-[0.22em] uppercase rounded-full hover:bg-navy/85 transition-all duration-500 hover:shadow-lg hover:shadow-navy/10">
            Tüm Ürünleri Gör
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
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
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-orange/80 font-medium">Kategoriler</span>
          <h2 className="font-cormorant text-[2rem] md:text-[2.7rem] font-light text-navy mt-4">
            Ürün <span className="italic text-orange">Aileleri</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {cats.map((c, i) => (
            <FadeIn key={c.ad} delay={i * 0.06}>
              <Link href="/urunler" className="group block p-7 md:p-8 rounded-xl border border-navy/[0.05] hover:border-orange/20 hover:shadow-[0_8px_40px_rgba(232,117,42,0.06)] transition-all duration-700 bg-white">
                <span className="text-2xl md:text-3xl">{c.ikon}</span>
                <h3 className="font-cormorant text-lg md:text-xl text-navy mt-4 group-hover:text-orange transition-colors duration-500">{c.ad}</h3>
                <p className="font-sans text-[0.72rem] text-navy/35 mt-2 leading-relaxed">{c.aciklama}</p>
                <div className="mt-4 w-0 group-hover:w-8 h-px bg-orange transition-all duration-700" />
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
    { baslik: "30+ Yıl Tecrübe", aciklama: "1995'ten beri sektörün güvenilir adresi", ikon: "⏳" },
    { baslik: "Hyundai L&C", aciklama: "Dünya markalarının Türkiye distribütörü", ikon: "🏭" },
    { baslik: "28 Ülkeye İhracat", aciklama: "Avrupa'dan Orta Doğu'ya global erişim", ikon: "🌍" },
    { baslik: "120+ Renk", aciklama: "Her mekana uygun geniş renk yelpazesi", ikon: "🎨" },
    { baslik: "Hızlı Teslimat", aciklama: "Stoktan anında, özel siparişte hızlı üretim", ikon: "🚚" },
    { baslik: "Teknik Destek", aciklama: "Uzman ekibimizle uygulama desteği", ikon: "🛠️" },
  ];

  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden grain">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="text-center mb-14">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-orange/80 font-medium">Neden Dekorem</span>
          <h2 className="font-cormorant text-[2rem] md:text-[2.7rem] font-light text-white mt-4">
            Bizi <span className="italic text-orange">Farklı</span> Kılan
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <FadeIn key={item.baslik} delay={i * 0.07}>
              <div className="p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 group">
                <span className="text-xl md:text-2xl">{item.ikon}</span>
                <h3 className="font-cormorant text-lg text-white mt-4 group-hover:text-orange transition-colors duration-500">{item.baslik}</h3>
                <p className="font-sans text-[0.72rem] text-white/30 mt-2 leading-relaxed">{item.aciklama}</p>
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
    <section id="iletisim" className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-orange/80 font-medium">İletişim</span>
          <h2 className="font-cormorant text-[2rem] md:text-[2.7rem] font-light text-navy mt-4 leading-[1.2]">
            Projeniz İçin<br className="hidden md:block" />
            <span className="italic text-orange">Yanınızdayız</span>
          </h2>
          <p className="font-sans text-navy/45 mt-6 text-[0.9rem] leading-relaxed max-w-md mx-auto">
            Renk seçimi, teknik detaylar veya fiyat bilgisi için bize ulaşın.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://wa.me/902122276316?text=Merhaba%2C%20Dekorem%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] text-white font-sans text-[0.68rem] tracking-[0.18em] uppercase rounded-full hover:bg-[#20bd5a] transition-all duration-500 shadow-[0_4px_20px_rgba(37,211,102,0.2)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.49-.646-6.34-1.768l-.455-.277-2.642.886.886-2.642-.277-.455A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp
          </a>
          <a href="mailto:info@dekorem.com.tr?subject=%C3%9Cr%C3%BCn%20Bilgi%20Talebi" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-navy text-white font-sans text-[0.68rem] tracking-[0.18em] uppercase rounded-full hover:bg-navy/85 transition-all duration-500 hover:shadow-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            E-posta
          </a>
          <a href="tel:+902122276316" className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-navy/10 text-navy/60 font-sans text-[0.68rem] tracking-[0.18em] uppercase rounded-full hover:border-navy/25 hover:text-navy transition-all duration-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Ara
          </a>
        </FadeIn>

        <FadeIn delay={0.25} className="mt-8">
          <p className="font-sans text-navy/25 text-[0.7rem]">Zambak Sk. No:8, Dikilitaş, Beşiktaş / İstanbul &nbsp;·&nbsp; +90 212 227 63 16</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <DekoremEmblem size={16} />
              <span className="font-jost font-light text-white text-[0.82rem] tracking-[0.32em]">dekorem</span>
            </div>
            <p className="font-cormorant italic text-white/20 text-sm">Yüzeylere Karakter, Mekanlara Hayat</p>
          </div>

          <div className="flex gap-14 md:gap-20">
            <div>
              <h4 className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-white/25 mb-4">Sayfalar</h4>
              <div className="flex flex-col gap-2.5">
                {[{ label: "Ana Sayfa", href: "/" }, { label: "Ürünler", href: "/urunler" }, { label: "İletişim", href: "#iletisim" }].map((l) => (
                  <Link key={l.label} href={l.href} className="font-sans text-[0.72rem] text-white/35 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-white/25 mb-4">İletişim</h4>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:info@dekorem.com.tr" className="font-sans text-[0.72rem] text-white/35 hover:text-white transition-colors">info@dekorem.com.tr</a>
                <a href="tel:+902122276316" className="font-sans text-[0.72rem] text-white/35 hover:text-white transition-colors">+90 212 227 63 16</a>
                <a href="https://dekorem.tahsildar.com.tr" target="_blank" rel="noopener noreferrer" className="font-sans text-[0.72rem] text-orange/50 hover:text-orange transition-colors">Online Ödeme →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[0.62rem] text-white/15">© 2025 Dekorem Ltd. Tüm hakları saklıdır.</p>
          <p className="font-sans text-[0.62rem] text-white/10">Zambak Sk. No:8, Dikilitaş, Beşiktaş / İstanbul</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ ANA SAYFA ═══════════════ */
export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-screen bg-navy flex flex-col items-center justify-center relative overflow-hidden grain vignette">
        {/* Dot pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo entrance */}
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)', transition: 'all 1.2s cubic-bezier(.16,1,.3,1)' }}>
            <div className="flex flex-col items-center gap-5 mb-10">
              <DekoremEmblem size={85} />
              <span className="font-jost font-light text-white tracking-[0.55em] text-[2.2rem] md:text-[2.75rem] leading-none">
                dekorem
              </span>
            </div>
          </div>

          <div style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease 0.4s' }}>
            <div className="w-10 h-px bg-orange/80 mx-auto mb-8" />
            <h1 className="font-cormorant font-light italic text-white/70 text-[1.35rem] md:text-[1.65rem] leading-relaxed mb-10 max-w-sm">
              Yüzeylere Karakter, Mekanlara Hayat
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.8s ease 0.7s' }}>
            <Link href="/urunler" className="px-10 py-3.5 bg-orange text-white font-sans text-[0.68rem] tracking-[0.22em] uppercase rounded-full hover:bg-[#d4671f] transition-all duration-500 min-w-[200px] text-center hover:shadow-lg hover:shadow-orange/20">
              Ürünleri Keşfet
            </Link>
            <Link href="#iletisim" className="px-10 py-3.5 border border-white/20 text-white/70 font-sans text-[0.68rem] tracking-[0.22em] uppercase rounded-full hover:border-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-500 min-w-[200px] text-center">
              İletişime Geç
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/20 animate-bounce">
          <svg width="16" height="9" viewBox="0 0 18 10" fill="none"><path d="M1 1L9 9L17 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
