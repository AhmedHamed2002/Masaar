const links = document.querySelectorAll(".menu-link");
const mobileMenu = document.getElementById("mobile-menu");
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
let currentStep = 0;
const projectStatus = document.getElementById("projectStatus");
const runningFields = document.getElementById("runningFields");
const ideaFields = document.getElementById("ideaFields");

  const sr = ScrollReveal({
    distance: "60px",
    duration: 1500,
    delay: 160,
    reset: true 
  });

  // كل Section يدخل من اتجاه معين
  sr.reveal("header", { origin: "top" });
  sr.reveal("#vision", { origin: "left" });
  sr.reveal("#objectives .objectives-card", { origin: "bottom", interval: 200 });
  sr.reveal("#strategies", { origin: "right" });
  sr.reveal("#fields .creative-card", { origin: "bottom", interval: 200 });
  sr.reveal("#mechanisms", { origin: "left" });
  sr.reveal("#join", { origin: "top" });
  sr.reveal("footer", { origin: "bottom" });


projectStatus.addEventListener("change", () => {
  if (projectStatus.value === "running") {
    runningFields.classList.remove("hidden");
    ideaFields.classList.add("hidden");

    // اجعل حقول مشروع قائم Required
    runningFields.querySelectorAll("input, textarea, select").forEach(el => {
      el.setAttribute("required", "true");
    });
    // الغي Required من حقول الفكرة
    ideaFields.querySelectorAll("input, textarea").forEach(el => {
      el.removeAttribute("required");
    });

  } else if (projectStatus.value === "idea" || projectStatus.value === "ready") {
    runningFields.classList.add("hidden");
    ideaFields.classList.remove("hidden");

    // اجعل حقول الفكرة Required
    ideaFields.querySelectorAll("input, textarea").forEach(el => {
      el.setAttribute("required", "true");
    });
    // الغي Required من حقول مشروع قائم
    runningFields.querySelectorAll("input, textarea, select").forEach(el => {
      el.removeAttribute("required");
    });

  } else {
    runningFields.classList.add("hidden");
    ideaFields.classList.add("hidden");

    // الغي Required من الاثنين
    runningFields.querySelectorAll("input, textarea, select").forEach(el => {
      el.removeAttribute("required");
    });
    ideaFields.querySelectorAll("input, textarea").forEach(el => {
      el.removeAttribute("required");
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const collapseElements = document.querySelectorAll('[data-collapse-toggle]');
  collapseElements.forEach(el => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('data-collapse-toggle');
      const target = document.getElementById(targetId);
      target.classList.toggle('hidden');
    });
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("text-teal-600", "border-b-2", "border-teal-600"));
      link.classList.add("text-teal-600", "border-b-2", "border-teal-600");
      if (window.innerWidth < 768) { 
        mobileMenu.classList.add("hidden");
      }
    });
  });
});


links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("text-teal-600", "border-b-2", "border-teal-600"));
    link.classList.add("text-teal-600", "border-b-2", "border-teal-600");
  });
});


function showStep(n) {
  steps.forEach((step, i) => step.classList.toggle("hidden", i !== n));
  prevBtn.classList.toggle("hidden", n === 0);
  nextBtn.classList.toggle("hidden", n === steps.length - 1);
  submitBtn.classList.toggle("hidden", n !== steps.length - 1);
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

showStep(currentStep);


// ✅ EmailJS Config
const PUBLIC_KEY = "yZJLqH8NGdn1eS4IA";
const SERVICE_ID = "service_xfbykix";
const TEMPLATE_ID = "template_ixlfo9j";

emailjs.init(PUBLIC_KEY);

const form = document.getElementById("regForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const submitBtn = form.querySelector("button[type='submit']");

  // ✅ تحقق من الحقول
  if (!/^\d{8,15}$/.test(phone)) {
    return Swal.fire("خطأ", "رقم الهاتف يجب أن يكون من 8-15 رقم.", "error");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return Swal.fire("خطأ", "الرجاء إدخال بريد إلكتروني صحيح.", "error");
  }

  // ✅ Loading
  Swal.fire({
    title: "جاري الإرسال...",
    text: "يرجى الانتظار قليلاً",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  submitBtn.disabled = true;
  document.querySelector("input[name='createdAt']").value = new Date().toLocaleString();
  // ✉️ إرسال باستخدام sendForm
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
    .then(() => {
      Swal.fire("نجاح", "تم إرسال طلبك بنجاح.", "success");
      form.reset();
    })
    .catch((err) => {
      Swal.fire("خطأ", "حدث خطأ أثناء الإرسال: " + err.text, "error");
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});
