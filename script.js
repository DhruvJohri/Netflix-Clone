const faqs = document.querySelectorAll(".faqbox");

faqs.forEach(faq=>{
    faq.addEventListener("click",()=>{
        faq.classList.toggle("open");
    })
})
