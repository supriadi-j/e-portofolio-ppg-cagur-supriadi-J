/* ============================================================
   E-Portofolio PPG Calon Guru 2026 — Interaksi (Dashboard UI)
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  var sidebar = doc.getElementById("sidebar");
  var overlay = doc.getElementById("sidebar-overlay");
  var hamburger = doc.getElementById("hamburger");
  var closeBtn = doc.getElementById("sidebar-close");
  var menuLinks = doc.querySelectorAll(".menu-link[href^='#'], .sidebar-nav a[href^='#']");

  /* ---------- Buka / tutup drawer (mobile) ---------- */
  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add("open");
    overlay.classList.add("show");
    doc.body.style.overflow = "hidden";
    if (hamburger) hamburger.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    doc.body.style.overflow = "";
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger) hamburger.addEventListener("click", openSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (href === "#" ) {
        e.preventDefault();
        return;
      }
      closeSidebar();
    });
  });

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  /* ---------- Galeri (dibangun dari foto asli PPL 1) ---------- */
  var galleryData = [
    { src: "PPL 1/SIKLUS 1/siklus1.1.jpeg", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 1 \u2014 \u201CAku dan Peranku di Sekolah\u201D" },
    { src: "PPL 1/SIKLUS 1/siklus1.2.jpeg", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 1 \u2014 Foto 2" },
    { src: "PPL 1/SIKLUS 1/siklus1.3.jpeg", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 1 \u2014 Foto 3" },
    { src: "PPL 1/SIKLUS 1/siklus1.4.jpeg", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 1 \u2014 Foto 4" },
    { src: "PPL 1/SIKLUS 2/siklus2.1.png", title: "Bimbingan Kelompok", cap: "PPL 1 \u00B7 Siklus 2 \u2014 \u201CAku Peduli, Aku Berperan\u201D" },
    { src: "PPL 1/SIKLUS 2/siklus2.2.png", title: "Bimbingan Kelompok", cap: "PPL 1 \u00B7 Siklus 2 \u2014 Foto 2" },
    { src: "PPL 1/SIKLUS 2/siklus2.3.png", title: "Bimbingan Kelompok", cap: "PPL 1 \u00B7 Siklus 2 \u2014 Foto 3" },
    { src: "PPL 1/SIKLUS 2/siklus2.4.png", title: "Bimbingan Kelompok", cap: "PPL 1 \u00B7 Siklus 2 \u2014 Foto 4" },
    { src: "PPL 1/SIKLUS 3/siklus3.1.png", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 3 \u2014 \u201CSeni Berteman Positif\u201D" },
    { src: "PPL 1/SIKLUS 3/siklus3.2.png", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 3 \u2014 Foto 2" },
    { src: "PPL 1/SIKLUS 3/siklus3.3.png", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 3 \u2014 Foto 3" },
    { src: "PPL 1/SIKLUS 3/siklus3.4.png", title: "Bimbingan Klasikal", cap: "PPL 1 \u00B7 Siklus 3 \u2014 Foto 4" }
  ];
  var galleryPalette = [
    ["#0ea5e9", "#155e75"], ["#8b5cf6", "#6d28d9"], ["#14b8a6", "#0f766e"], ["#f59e0b", "#b45309"]
  ];
  var galleryGrid = doc.getElementById("gallery-grid");
  var galleryButtons = [];

  (function buildGallery() {
    if (!galleryGrid) return;
    galleryData.forEach(function (g, i) {
      var fig = doc.createElement("figure");
      fig.className = "gallery-item reveal";
      fig.setAttribute("data-delay", String(i % 4));
      var c = galleryPalette[i % galleryPalette.length];
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "g-photo";
      btn.dataset.idx = String(i);
      btn.style.setProperty("--g1", c[0]);
      btn.style.setProperty("--g2", c[1]);
      var img = doc.createElement("img");
      img.alt = g.title;
      img.loading = "lazy";
      img.onerror = function () { btn.textContent = "\uD83D\uDCF0"; };
      img.src = encodeURI(g.src);
      btn.appendChild(img);
      var cap = doc.createElement("figcaption");
      cap.innerHTML = "<span>" + g.title + "</span><small>" + g.cap + "</small>";
      fig.appendChild(btn);
      fig.appendChild(cap);
      btn.addEventListener("click", function () { openLightbox(Number(btn.dataset.idx)); });
      galleryButtons.push(btn);
      galleryGrid.appendChild(fig);
    });
  })();

  /* ---------- Active menu berdasarkan posisi scroll ---------- */
  var sections = doc.querySelectorAll("main section[id]");
  var navLinks = doc.querySelectorAll(".sidebar-nav .menu-link[href^='#'], .footer-grid nav a[href^='#']");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var match = link.getAttribute("href") === "#" + id;
          link.classList.toggle("is-active", match);
          if (match) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt((el.dataset.delay || "0"), 10) * 90;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("in");
          rev.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { rev.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Tabs (Semester 1 / Semester 2) ---------- */
  var tabButtons = doc.querySelectorAll(".tab-btn");
  var tabPanels = doc.querySelectorAll(".tab-panel");

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.dataset.tab;

      tabButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });

      tabPanels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.id === "panel-" + target);
        panel.querySelectorAll(".reveal").forEach(function (el, i) {
          el.style.transitionDelay = (i % 3) * 80 + "ms";
          el.classList.add("in");
        });
      });
    });
  });

  /* ---------- Progress bar ---------- */
  var progress = doc.getElementById("progressBar");
  function updateProgress() {
    if (!progress) return;
    var h = doc.documentElement;
    var total = h.scrollHeight - h.clientHeight;
    var pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
    progress.style.width = pct + "%";
  }
  doc.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- Tombol kembali ke atas ---------- */
  var toTop = doc.getElementById("to-top");
  function toggleToTop() {
    if (!toTop) return;
    var show = doc.documentElement.scrollTop > 420;
    toTop.classList.toggle("show", show);
  }
  doc.addEventListener("scroll", toggleToTop, { passive: true });
  toggleToTop();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Artefak: daftar dokumen per kategori ---------- */
  var toast = doc.getElementById("toast");
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  var DOCS = {
    rplbk: {
      title: "RPLBK",
      sub: "Rencana Pelaksanaan Layanan Bimbingan dan Konseling",
      files: [
        { label: "RPLBK \u2014 Aku dan Peranku di Sekolah (Siklus 1)", path: "SIKLUS 1/RPLBK AKU DAN PERANKU DI SEKOLAH.pdf" },
        { label: "RPL BK Kelompok \u2014 Tanggung Jawab Sosial (Siklus 2)", path: "SIKLUS 2/RPL_BK_KLP_Tanggung_Jawab_Sosial.pdf" },
        { label: "RPL Klasikal \u2014 Seni Berteman (Siklus 3)", path: "SIKLUS 3/RPL_Klasikal_Seni Berteman Keterampilan Berinteraksi Sosial yang Positif & Menyenangkan.pdf" }
      ]
    },
    laporan: {
      title: "Laporan PPL",
      sub: "Laporan dan lembar penilaian praktik pengalaman lapangan",
      files: [
        { label: "Best Practice Pelaksanaan Layanan Klasikal", path: "BEST PRACTICE PELAKSANAAN LAYANAN KLASIKAL.pdf" },
        { label: "Lembar Penilaian Penyusunan Perangkat Layanan", path: "Lembar Penilaian Penyusunan Perangkat Layanan .pdf" },
        { label: "Lembar Penilaian Praktik Layanan", path: "Lembar Penilaian Praktik Layanan.pdf" }
      ]
    },
    materi: {
      title: "Materi Konseling",
      sub: "Materi layanan klasikal dan kelompok",
      files: [
        { label: "PPT \u2014 Aku dan Peranku di Sekolah (Siklus 1)", path: "SIKLUS 1/PPT_SIKLUS1_SUPRIADI.pptx" },
        { label: "PPT \u2014 Aku Peduli, Aku Berperan (Siklus 2)", path: "SIKLUS 2/AKU PEDULI, AKU BERPERAN.pptx" },
        { label: "PPT \u2014 Seni Berteman (Siklus 3)", path: "SIKLUS 3/Seni Berteman Keterampilan Berinteraksi Sosial yang Positif & Menyenangkan.pptx" }
      ]
    },
    asesmen: {
      title: "Instrumen Asesmen",
      sub: "LKPD serta evaluasi proses dan hasil layanan",
      files: [
        { label: "LKPD Siklus 1", path: "SIKLUS 1/LKPD_SIKLUS1_SUPRIADI.pdf" },
        { label: "LKPD dan Lembar Refleksi \u2014 Siklus 2", path: "SIKLUS 2/LKPD dan Lembar Refleksi.pdf" },
        { label: "Lembar Kerja Peserta Didik \u2014 Siklus 3", path: "SIKLUS 3/LEMBAR KERJA PESERTA DIDIK.pdf" },
        { label: "Rekapitulasi Evaluasi Proses \u2014 Siklus 1", path: "SIKLUS 1/REKAPITULASI EVALUASI PROSES LAYANAN BIMBINGAN KLASIKAL.pdf" },
        { label: "Rekapitulasi Evaluasi Hasil \u2014 Siklus 1", path: "SIKLUS 1/REKAPITULASI EVALUASI HASIL LAYANAN BIMBINGAN KLASIKAL.pdf" },
        { label: "Rekapitulasi Evaluasi Proses \u2014 Siklus 2", path: "SIKLUS 2/Rekap Evaluasi proses.pdf" },
        { label: "Rekapitulasi Evaluasi Hasil \u2014 Siklus 2", path: "SIKLUS 2/Rekap Evaluasi Hasil.pdf" },
        { label: "Rekapitulasi Evaluasi Proses \u2014 Siklus 3", path: "SIKLUS 3/Rekap Evaluasi proses.pdf" },
        { label: "Rekapitulasi Evaluasi Hasil \u2014 Siklus 3", path: "SIKLUS 3/Rekap Evaluasi Hasil.pdf" }
      ]
    }
  };

  var docsModal = doc.getElementById("docs-modal");
  var docsBody = doc.getElementById("docs-body");
  var docsTitle = doc.getElementById("docs-modal-title");
  var docsSub = doc.getElementById("docs-modal-sub");

  function openDocs(cat) {
    if (cat === "dokumentasi") {
      var gal = doc.getElementById("galeri");
      if (gal) gal.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (cat === "jurnal") {
      showToast("Jurnal Refleksi sedang disiapkan \u2014 akan segera hadir.");
      return;
    }
    var d = DOCS[cat];
    if (!d || !docsBody) return;
    docsTitle.textContent = d.title;
    docsSub.textContent = d.sub;
    var html = '<ul class="doc-list">';
    d.files.forEach(function (f) {
      var url = encodeURI(f.path).replace(/&/g, "%26");
      var ext = (f.path.split(".").pop() || "file").toUpperCase();
      html += '<li><a href="' + url + '" target="_blank" rel="noopener">' +
        '<span class="doc-ico">' + (ext === "PPTX" ? "\uD83D\uDCDC" : "\uD83D\uDCC4") + "</span>" +
        "<span>" + f.label + "</span>" +
        '<small class="doc-ext">' + ext + "</small>" +
        '<span class="doc-go">\u2197</span></a></li>';
    });
    html += '</ul><p class="m-note">Klik item untuk membuka dokumen pada tab baru.</p>';
    docsBody.innerHTML = html;
    docsModal.classList.add("open");
    doc.body.style.overflow = "hidden";
  }

  function closeDocs() {
    if (!docsModal) return;
    docsModal.classList.remove("open");
    doc.body.style.overflow = "";
  }

  doc.querySelectorAll("[data-close-docs]").forEach(function (el) {
    el.addEventListener("click", closeDocs);
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDocs();
  });

  doc.querySelectorAll(".artifact-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openDocs(card.dataset.cat);
    });
  });

  /* ---------- Data detail RPLBK per siklus ---------- */
  var RPLBK = {
    "ppl1-s1": {
      badge: "PPL 1",
      jenis: "Bimbingan Klasikal",
      tema: "Aku dan Peranku di Sekolah",
      info: { "Bidang": "Pribadi &amp; Sosial", "Fungsi": "Pemahaman", "Sasaran": "Peserta didik kelas VII", "Waktu": "2 \u00d7 40 menit" },
      tujuan: [
        "Peserta didik memahami peran dan tanggung jawabnya di lingkungan sekolah.",
        "Peserta didik mampu mengidentifikasi minat dan potensi dirinya.",
        "Peserta didik dapat menyusun komitmen untuk berperan aktif di sekolah."
      ],
      asesmen: "AKPD (instrumen asesmen kebutuhan) untuk pemetaan kebutuhan awal peserta didik.",
      materi: "Peran peserta didik di sekolah, potensi diri, dan kontribusi positif dalam kehidupan sekolah.",
      metode: "Ceramah interaktif, diskusi kelompok kecil, dan tanya jawab.",
      media: "Slide presentasi interaktif, kartu peran, papan impian (dream board).",
      tahapan: [
        { nama: "Pendahuluan", isi: "Salam, ice breaking, penyampaian tujuan layanan, dan kontrak belajar bersama peserta didik." },
        { nama: "Tahap Inti", isi: "Paparan materi peran di sekolah, diskusi kelompok, serta presentasi hasil identifikasi potensi dan peran masing-masing." },
        { nama: "Penutup", isi: "Kesimpulan bersama, refleksi singkat, pengisian lembar evaluasi, serta kesepakatan tindak lanjut." }
      ],
      evaluasi: "Lembar evaluasi proses dan hasil (penilaian pemahaman peran peserta didik).",
      tindakLanjut: "Pendampingan lanjutan pada peserta didik yang membutuhkan penguatan peran di sekolah.",
      dokumen: [
        { label: "RPLBK \u2014 Aku dan Peranku di Sekolah", path: "SIKLUS 1/RPLBK AKU DAN PERANKU DI SEKOLAH.pdf" },
        { label: "LKPD Siklus 1", path: "SIKLUS 1/LKPD_SIKLUS1_SUPRIADI.pdf" },
        { label: "PPT Siklus 1", path: "SIKLUS 1/PPT_SIKLUS1_SUPRIADI.pptx" },
        { label: "Rekapitulasi Evaluasi Proses", path: "SIKLUS 1/REKAPITULASI EVALUASI PROSES LAYANAN BIMBINGAN KLASIKAL.pdf" },
        { label: "Rekapitulasi Evaluasi Hasil", path: "SIKLUS 1/REKAPITULASI EVALUASI HASIL LAYANAN BIMBINGAN KLASIKAL.pdf" }
      ]
    },
    "ppl1-s2": {
      badge: "PPL 1",
      jenis: "Bimbingan Kelompok",
      tema: "Aku Peduli, Aku Berperan",
      info: { "Bidang": "Pribadi &amp; Sosial", "Fungsi": "Pemahaman &amp; Pengembangan", "Sasaran": "Peserta didik Kelas VII", "Waktu": "2 \u00d7 40 menit" },
      tujuan: [
        "Peserta didik mengembangkan sikap peduli terhadap teman sebaya.",
        "Peserta didik berlatih berperan aktif dalam dinamika kelompok.",
        "Peserta didik mampu menerapkan kepedulian dalam kehidupan sehari-hari."
      ],
      asesmen: "Observasi kebutuhan sosial emosional dan hasil AKPD pendukung.",
      materi: "Empati, kepedulian sosial, dan kontribusi anggota dalam kelompok.",
      metode: "Dinamika kelompok, diskusi terbuka, dan bermain peran.",
      media: "Lembar kasus, kartu situasi, dan media flipchart.",
      tahapan: [
        { nama: "Pendahuluan", isi: "Pembentukan kelompok, perkenalan, kesepakatan main z (aturan kelompok), dan penyampaian tujuan." },
        { nama: "Tahap Inti", isi: "Pembahasan topik kepedulian melalui kasus simulasi, unjuk peran, serta refleksi dinamika kelompok." },
        { nama: "Penutup", isi: "Penyimpulan hasil diskusi, umpan balik antar anggota, dan perencanaan aksi kepedulian." }
      ],
      evaluasi: "Observasi keaktifan anggota dan lembar penilaian kerja kelompok.",
      tindakLanjut: "Tindak lanjut pada anggota yang belum aktif melalui bimbingan individual.",
      dokumen: [
        { label: "RPL BK Kelompok \u2014 Tanggung Jawab Sosial", path: "SIKLUS 2/RPL_BK_KLP_Tanggung_Jawab_Sosial.pdf" },
        { label: "LKPD dan Lembar Refleksi", path: "SIKLUS 2/LKPD dan Lembar Refleksi.pdf" },
        { label: "PPT \u2014 Aku Peduli, Aku Berperan", path: "SIKLUS 2/AKU PEDULI, AKU BERPERAN.pptx" },
        { label: "Rekapitulasi Evaluasi Proses", path: "SIKLUS 2/Rekap Evaluasi proses.pdf" },
        { label: "Rekapitulasi Evaluasi Hasil", path: "SIKLUS 2/Rekap Evaluasi Hasil.pdf" }
      ]
    },
    "ppl1-s3": {
      badge: "PPL 1",
      jenis: "Bimbingan Klasikal",
      tema: "Seni Berteman Positif",
      info: { "Bidang": "Sosial Emosional", "Fungsi": "Pemahaman", "Sasaran": "Peserta didik kelas VII", "Waktu": "2 \u00d7 40 menit" },
      tujuan: [
        "Peserta didik memahami pentingnya hubungan pertemanan yang sehat.",
        "Peserta didik mampu membedakan pertemanan positif dan negatif.",
        "Peserta didik dapat menunjukkan keterampilan komunikasi yang positif."
      ],
      asesmen: "Skala sikap pertemanan sebagai instrumen asesmen kebutuhan.",
      materi: "Ciri pertemanan sehat, bahaya pertemanan toksik, dan seni berkomunikasi efektif.",
      metode: "Studi kasus, diskusi, dan permainan simulasi komunikasi.",
      media: "Video/cerita kasus, kartu seni berteman (kartu \u201Cjangan-dan-lakukan\u201D).",
      tahapan: [
        { nama: "Pendahuluan", isi: "Apersepsi lewat permainan relasi, penyampaian tujuan layanan dan asesmen awal." },
        { nama: "Tahap Inti", isi: "Analisis kasus pertemanan sehat vs toksik, simulasi komunikasi positif, dan diskusi hasil." },
        { nama: "Penutup", isi: "Refleksi, penguatan nilai, evaluasi pemahaman, dan komitmen berteman positif." }
      ],
      evaluasi: "Lembar refleksi dan penilaian pemahaman konsep pertemanan positif.",
      tindakLanjut: "Pemantauan relasi sosial peserta didik dan konsultasi lanjutan bila diperlukan.",
      dokumen: [
        { label: "RPL Klasikal \u2014 Seni Berteman", path: "SIKLUS 3/RPL_Klasikal_Seni Berteman Keterampilan Berinteraksi Sosial yang Positif & Menyenangkan.pdf" },
        { label: "Lembar Kerja Peserta Didik", path: "SIKLUS 3/LEMBAR KERJA PESERTA DIDIK.pdf" },
        { label: "PPT \u2014 Seni Berteman", path: "SIKLUS 3/Seni Berteman Keterampilan Berinteraksi Sosial yang Positif & Menyenangkan.pptx" },
        { label: "Rekapitulasi Evaluasi Proses", path: "SIKLUS 3/Rekap Evaluasi proses.pdf" },
        { label: "Rekapitulasi Evaluasi Hasil", path: "SIKLUS 3/Rekap Evaluasi Hasil.pdf" }
      ]
    },
    "ppl2-s1": {
      badge: "PPL 2",
      jenis: "Bimbingan Klasikal",
      tema: "Aku dan Peranku di Sekolah",
      info: { "Bidang": "Pribadi &amp; Sosial", "Fungsi": "Pemahaman", "Sasaran": "Peserta didik kelas X", "Waktu": "1 \u00d7 40 menit" },
      tujuan: [
        "Peserta didik memaknai peran aktif dalam kehidupan sekolah.",
        "Peserta didik mengembangkan tujuan belajar dan karier jangka pendek.",
        "Peserta didik menyusun rencana kontribusi nyata di sekolah."
      ],
      asesmen: "AKPD dan kuisioner keaktifan peserta didik di sekolah.",
      materi: "Eksplorasi peran, penetapan tujuan belajar, dan rencana kontribusi positif.",
      metode: "Ceramah interaktif, diskusi, dan workhsop rencana aksi.",
      media: "Media digital interaktif dan lembar rencana aksi.",
      tahapan: [
        { nama: "Pendahuluan", isi: "Ice breaking, review materi sebelumnya, dan kontrak layanan." },
        { nama: "Tahap Inti", isi: "Eksplorasi potensi, penyusunan tujuan belajar, dan presentasi rencana kontribusi." },
        { nama: "Penutup", isi: "Umpan balik, refleksi diri, dan evaluasi hasil layanan." }
      ],
      evaluasi: "Lembar penilaian rencana aksi peserta didik.",
      tindakLanjut: "Monitoring pelaksanaan rencana aksi peserta didik secara berkala.",
      dokumen: [
        { label: "RPLBK PPL 2 — Siklus 1", path: "PPL 2/Bimbingan Klasikal/Siklus 1/RPLBK PPL 2 - Siklus 1.html" },
        { label: "LKPD PPL 2 — Siklus 1", path: "PPL 2/Bimbingan Klasikal/Siklus 1/LKPD PPL 2 - Siklus 1.html" },
        { label: "Media PPL 2 — Siklus 1", path: "PPL 2/Bimbingan Klasikal/Siklus 1/Media PPL 2 - Siklus 1.html" },
        { label: "Rekap Proses PPL 2 — Siklus 1", path: "PPL 2/Bimbingan Klasikal/Siklus 1/Rekap Proses PPL 2 - Siklus 1.html" },
        { label: "Rekap Hasil PPL 2 — Siklus 1", path: "PPL 2/Bimbingan Klasikal/Siklus 1/Rekap Hasil PPL 2 - Siklus 1.html" },
        { label: "Lembar Penilaian Guru Pamong PPL 2 — Siklus 1", path: "PPL 2/Bimbingan Klasikal/Lembar Penilaian Guru Pamong.html" }
      ]
    },
    "ppl2-s2": {
      badge: "PPL 2",
      jenis: "Bimbingan Kelompok",
      tema: "Mengenal Potensi Diri",
      info: { "Bidang": "Pribadi", "Fungsi": "Pemahaman &amp; Pengembangan", "Sasaran": "Kelompok 8\u201310 peserta didik", "Waktu": "1 \u00d7 40 menit" },
      tujuan: [
        "Peserta didik mengenali kekuatan dan potensi dirinya.",
        "Peserta didik mengembangkan kepercayaan diri.",
        "Peserta didik mampu merencanakan pengembangan potensi."
      ],
      asesmen: "Instrumen asesmen potensi diri (inventori minat bakat).",
      materi: "Potensi diri, kekuatan personal, dan strategi pengembangan diri.",
      metode: "Self-assessment, diskusi kelompok, dan umpan balik teman.",
      media: "Kartu potensi dan lembar profil diri.",
      tahapan: [
        { nama: "Pendahuluan", isi: "Perkenalan anggota baru, kontrak kelompok, dan pencairan suasana." },
        { nama: "Tahap Inti", isi: "Self-assessment potensi, saling memberi umpan balik, dan merumuskan langkah pengembangan." },
        { nama: "Penutup", isi: "Refleksi hasil, komitmen pengembangan diri, dan evaluasi proses kelompok." }
      ],
      evaluasi: "Lembar komitmen pengembangan potensi.",
      tindakLanjut: "Follow-up perkembangan potensi melalui layanan konseling individual.",
      dokumen: [
        { label: "RPLBK PPL 2 — Siklus 2", path: "PPL 2/Bimbingan Kelompok/Siklus 2/RPLBK PPL 2 - Siklus 2.html" },
        { label: "LKPD PPL 2 — Siklus 2", path: "PPL 2/Bimbingan Kelompok/Siklus 2/LKPD PPL 2 - Siklus 2.html" },
        { label: "Media PPL 2 — Siklus 2", path: "PPL 2/Bimbingan Kelompok/Siklus 2/Media PPL 2 - Siklus 2.html" },
        { label: "Rekap Proses PPL 2 — Siklus 2", path: "PPL 2/Bimbingan Kelompok/Siklus 2/Rekap Proses PPL 2 - Siklus 2.html" },
        { label: "Rekap Hasil PPL 2 — Siklus 2", path: "PPL 2/Bimbingan Kelompok/Siklus 2/Rekap Hasil PPL 2 - Siklus 2.html" },
        { label: "Lembar Penilaian Guru Pamong PPL 2 — Siklus 2", path: "PPL 2/Bimbingan Kelompok/Lembar Penilaian Guru Pamong.html" }
      ]
    },
    "ppl2-s3": {
      badge: "PPL 2",
      jenis: "Konseling Kelompok",
      tema: "Menyelesaikan Masalah Bersama",
      info: { "Bidang": "Pribadi &amp; Sosial", "Fungsi": "Pengentasan Masalah", "Sasaran": "Kelompok konseling 6\u20138 konseli", "Waktu": "2 \u00d7 40 menit" },
      tujuan: [
        "Konseli mampu mengungkapkan permasalahan yang dialaminya.",
        "Konseli memperoleh dukungan dan perspektif baru dari anggota kelompok.",
        "Konseli dapat merencanakan penyelesaian masalah bersama."
      ],
      asesmen: "Assessment individu sebelum penempatan dalam kelompok konseling.",
      materi: "Manajemen masalah, saling empati, dan pengambilan keputusan.",
      metode: "Konseling kelompok (dinamika kelompok terapeutik).",
      media: "Kartu kasus dan lembar rencana penyelesaian masalah.",
      tahapan: [
        { nama: "Pembentukan", isi: "Pengenalan diri, penjelasan asas konseling, dan kesepakatan bersama." },
        { nama: "Peralihan", isi: "Pengecekan kesiapan anggota dan jembatan menuju kegiatan inti." },
        { nama: "Kegiatan Inti", isi: "Pengungkapan masalah secara bergantian, diskusi solusi, dan perencanaan tindakan." },
        { nama: "Pengakhiran", isi: "Rangkuman hasil, evaluasi, dan tindak lanjut konseling." }
      ],
      evaluasi: "Lembar evaluasi proses dan hasil konseling kelompok.",
      tindakLanjut: "Konseling lanjutan atau pengalihantanganan sesuai kebutuhan konseli.",
      dokumen: [
        { label: "RPLBK PPL 2 \u2014 Siklus 3", path: "PPL 2/Konseling Kelompok/Siklus 3/RPLBK PPL 2 - Siklus 3.html" },
        { label: "LKPD PPL 2 \u2014 Siklus 3", path: "PPL 2/Konseling Kelompok/Siklus 3/LKPD PPL 2 - Siklus 3.html" },
        { label: "Media PPL 2 \u2014 Siklus 3", path: "PPL 2/Konseling Kelompok/Siklus 3/Media PPL 2 - Siklus 3.html" },
        { label: "Rekap Proses PPL 2 \u2014 Siklus 3", path: "PPL 2/Konseling Kelompok/Siklus 3/Rekap Proses PPL 2 - Siklus 3.html" },
        { label: "Rekap Hasil PPL 2 \u2014 Siklus 3", path: "PPL 2/Konseling Kelompok/Siklus 3/Rekap Hasil PPL 2 - Siklus 3.html" },
        { label: "Lembar Penilaian Guru Pamong PPL 2 \u2014 Siklus 3", path: "PPL 2/Konseling Kelompok/Lembar Penilaian Guru Pamong.html" }
      ]
    },
    "ppl2-s4": {
      badge: "PPL 2",
      jenis: "Konseling Individu",
      tema: "Menyelesaikan Masalah Individu",
      info: { "Bidang": "Pribadi", "Fungsi": "Pengentasan Masalah", "Sasaran": "Konseli individual", "Waktu": "1 \u00d7 45 menit" },
      tujuan: [
        "Konseli mampu mengklarifikasi permasalahan yang dihadapi.",
        "Konseli mengembangkan alternatif penyelesaian yang tepat.",
        "Konseli mengambil keputusan dan melakukan perubahan perilaku."
      ],
      asesmen: "Assessment awal, pengungkapan masalah, dan wawancara konseling.",
      materi: "Identifikasi masalah, eksplorasi alternatif, dan rencana aksi perubahan.",
      metode: "Konseling individual dengan pendekatan CBT/konseling berpusat klien sesuai kebutuhan.",
      media: "Format catatan proses konseling (BKPI/record).",
      tahapan: [
        { nama: "Awal", isi: "Rapport, menciptakan safe space, kontrak konseling, dan identifikasi masalah." },
        { nama: "Tengah", isi: "Eksplorasi masalah, pemahaman baru konseli, dan penyusunan alternatif solusi." },
        { nama: "Akhir", isi: "Pengambilan keputusan, perencanaan tindakan, dan terminasi dengan follow-up." }
      ],
      evaluasi: "Evaluasi proses, perubahan perilaku konseli, dan kesepakatan tindak lanjut.",
      tindakLanjut: "Pemantauan berkala dan konseling lanjutan sesuai kebutuhan konseli.",
      dokumen: [
        { label: "RPLBK PPL 2 \u2014 Siklus 4", path: "PPL 2/Konseling Individu/Siklus 4/RPLBK PPL 2 - Siklus 4.html" },
        { label: "LKPD PPL 2 \u2014 Siklus 4", path: "PPL 2/Konseling Individu/Siklus 4/LKPD PPL 2 - Siklus 4.html" },
        { label: "Media PPL 2 \u2014 Siklus 4", path: "PPL 2/Konseling Individu/Siklus 4/Media PPL 2 - Siklus 4.html" },
        { label: "Rekap Proses PPL 2 \u2014 Siklus 4", path: "PPL 2/Konseling Individu/Siklus 4/Rekap Proses PPL 2 - Siklus 4.html" },
        { label: "Rekap Hasil PPL 2 \u2014 Siklus 4", path: "PPL 2/Konseling Individu/Siklus 4/Rekap Hasil PPL 2 - Siklus 4.html" },
        { label: "Lembar Penilaian Guru Pamong PPL 2 \u2014 Siklus 4", path: "PPL 2/Konseling Individu/Lembar Penilaian Guru Pamong.html" }
      ]
    }
  };

  /* ---------- Modal detail siklus ---------- */
  var modal = doc.getElementById("siklus-modal");
  var modalBody = doc.getElementById("modal-body");
  var modalBadge = doc.getElementById("modal-badge");
  var modalTitle = doc.getElementById("modal-title");
  var modalTema = doc.getElementById("modal-tema");

  function renderModal(slot) {
    var d = RPLBK[slot];
    if (!d || !modalBody) return;

    modalBadge.textContent = d.badge;
    modalTitle.textContent = d.jenis;
    modalTema.textContent = "\u201C" + d.tema + "\u201D";

    var infoHtml = "";
    Object.keys(d.info).forEach(function (key) {
      infoHtml += "<div><dt>" + key + "</dt><dd>" + d.info[key] + "</dd></div>";
    });

    var tujuanHtml = d.tujuan.map(function (t) { return "<li>" + t + "</li>"; }).join("");

    var tahapHtml = d.tahapan.map(function (s, i) {
      return '<div class="step"><strong>' + (i + 1) + ". " + s.nama + "</strong><p>" + s.isi + "</p></div>";
    }).join("");

    var dokHtml = "";
    if (d.dokumen && d.dokumen.length) {
      dokHtml = '<div class="m-block"><h4>&#128193; Dokumen Pendukung</h4><ul class="doc-list">';
      d.dokumen.forEach(function (f) {
        var url = encodeURI(f.path).replace(/&/g, "%26");
        var ext = (f.path.split(".").pop() || "file").toUpperCase();
        dokHtml += '<li><a href="' + url + '" target="_blank" rel="noopener">' +
          '<span class="doc-ico">' + (ext === "PPTX" ? "\uD83D\uDCDC" : "\uD83D\uDCC4") + "</span>" +
          "<span>" + f.label + "</span>" +
          '<small class="doc-ext">' + ext + "</small>" +
          '<span class="doc-go">\u2197</span></a></li>';
      });
      dokHtml += '</ul></div>';
    }

    modalBody.innerHTML =
      '<dl class="m-info">' + infoHtml + '</dl>' +
      '<div class="m-block"><h4>&#127919; Tujuan Layanan</h4><ul>' + tujuanHtml + '</ul></div>' +
      '<div class="m-block"><h4>&#128202; Asesmen Awal</h4><p>' + d.asesmen + '</p></div>' +
      '<div class="m-block"><h4>&#128218; Materi</h4><p>' + d.materi + '</p></div>' +
      '<div class="m-block"><h4>&#127908; Metode</h4><p>' + d.metode + '</p></div>' +
      '<div class="m-block"><h4>&#128241; Media</h4><p>' + d.media + '</p></div>' +
      '<div class="m-block"><h4>&#128210; Tahapan Kegiatan</h4><div class="m-tahap">' + tahapHtml + '</div></div>' +
      '<div class="m-block"><h4>&#9989; Evaluasi</h4><p>' + d.evaluasi + '</p></div>' +
      '<div class="m-block"><h4>&#128259; Tindak Lanjut</h4><p>' + d.tindakLanjut + '</p></div>' +
      dokHtml;
  }

  function openModal(slot) {
    renderModal(slot);
    if (!modal) return;
    modal.classList.add("open");
    doc.body.style.overflow = "hidden";
    modal.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    doc.body.style.overflow = "";
  }

  doc.querySelectorAll(".siklus-item").forEach(function (item) {
    item.addEventListener("click", function () {
      openModal(item.dataset.slot);
    });
  });

  doc.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeLightbox(); }
  });

  /* ---------- Lightbox ---------- */
  var lightbox = doc.getElementById("lightbox");
  var lbStage = doc.getElementById("lb-stage");
  var lbIndex = 0;

  function renderLightbox(idx) {
    if (!lbStage || !galleryButtons.length) return;
    lbIndex = (idx + galleryButtons.length) % galleryButtons.length;
    var btn = galleryButtons[lbIndex];
    var g = galleryData[lbIndex];
    lbStage.innerHTML = "";
    var stage = doc.createElement("div");
    stage.className = "lb-photo";
    stage.style.setProperty("--g1", btn.style.getPropertyValue("--g1"));
    stage.style.setProperty("--g2", btn.style.getPropertyValue("--g2"));
    var thumb = btn.querySelector("img");
    if (thumb) {
      var big = thumb.cloneNode(false);
      stage.appendChild(big);
    } else {
      stage.textContent = "\uD83D\uDCF0";
    }
    lbStage.appendChild(stage);
    var cap = doc.createElement("figcaption");
    cap.innerHTML = "<strong>" + g.title + "</strong><small>" + g.cap + "</small>";
    lbStage.appendChild(cap);
  }

  function openLightbox(idx) {
    if (!lightbox) return;
    renderLightbox(idx);
    lightbox.classList.add("open");
    doc.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    doc.body.style.overflow = "";
  }

  doc.querySelectorAll("[data-close-lightbox]").forEach(function (el) {
    el.addEventListener("click", closeLightbox);
  });
  var lbPrev = doc.querySelector("[data-lb='prev']");
  var lbNext = doc.querySelector("[data-lb='next']");
  if (lbPrev) lbPrev.addEventListener("click", function () { renderLightbox(lbIndex - 1); });
  if (lbNext) lbNext.addEventListener("click", function () { renderLightbox(lbIndex + 1); });

  /* ---------- Cetak halaman ---------- */
  var printBtn = doc.getElementById("btn-print");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ---------- Tahun footer ---------- */
  var year = doc.querySelector(".year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
