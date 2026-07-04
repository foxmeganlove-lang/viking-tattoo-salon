document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. КОНФИГУРАЦИЯ И ДИНАМИЧЕСКИЙ РЕНДЕРИНГ
       ========================================== */
    const config = window.CONFIG || {};

    // Показ предупреждения о демо-режиме
    if (config.FORM_MODE === 'demo') {
        const badge = document.createElement('div');
        badge.className = 'demo-badge';
        badge.id = 'demo-mode-badge';
        badge.innerHTML = `<span>⚠️ Сайт работает в демонстрационном режиме. Заявки обрабатываются локально без отправки на сервер.</span>`;
        document.body.prepend(badge);
        document.body.classList.add('has-demo-badge');
    }

    // Применение общих текстовых полей
    if (config.STUDIO_NAME) {
        document.querySelectorAll('.logo-text').forEach(el => {
            el.innerHTML = `${config.STUDIO_NAME.split(' ')[0]} <span class="accent">${config.STUDIO_NAME.split(' ').slice(1).join(' ') || ''}</span>`;
        });
    }

    // Применение контактов
    if (config.PHONE) {
        document.querySelectorAll('.cfg-phone').forEach(el => {
            el.textContent = config.PHONE;
            el.setAttribute('href', `tel:${config.PHONE.replace(/\D/g, '')}`);
        });
    }
    if (config.EMAIL) {
        document.querySelectorAll('.cfg-email').forEach(el => {
            el.textContent = config.EMAIL;
            el.setAttribute('href', `mailto:${config.EMAIL}`);
        });
    }
    if (config.ADDRESS) {
        document.querySelectorAll('.cfg-address').forEach(el => {
            el.textContent = config.ADDRESS;
        });
    }
    if (config.HOURS) {
        document.querySelectorAll('.cfg-hours').forEach(el => {
            el.textContent = config.HOURS;
        });
    }
    if (config.MAP_LINK) {
        const mapLink = document.getElementById('cfg-map-link');
        if (mapLink) {
            mapLink.setAttribute('href', config.MAP_LINK);
        }
    }

    // Применение ссылок на соцсети
    if (config.TELEGRAM_URL) {
        document.querySelectorAll('.fa-telegram').forEach(el => {
            el.closest('a').setAttribute('href', config.TELEGRAM_URL);
        });
    }
    if (config.WHATSAPP_URL) {
        document.querySelectorAll('.fa-whatsapp').forEach(el => {
            el.closest('a').setAttribute('href', config.WHATSAPP_URL);
        });
    }
    if (config.VK_URL) {
        document.querySelectorAll('.fa-vk').forEach(el => {
            el.closest('a').setAttribute('href', config.VK_URL);
        });
    }
    // Ссылки на Instagram закомментированы/отключены из-за ограничений в РФ
    if (config.INSTAGRAM_URL) {
        document.querySelectorAll('.fa-instagram').forEach(el => {
            el.closest('a').setAttribute('href', config.INSTAGRAM_URL);
        });
    }

    // Рендеринг преимуществ (руны в первом экране)
    const featuresContainer = document.querySelector('.hero-features');
    if (featuresContainer && config.ADVANTAGES && config.ADVANTAGES.length > 0) {
        featuresContainer.innerHTML = '';
        config.ADVANTAGES.forEach(adv => {
            const item = document.createElement('div');
            item.className = 'feature-item';
            item.innerHTML = `
                <span class="feature-icon">${adv.rune}</span>
                <span class="feature-text">${adv.title}</span>
            `;
            featuresContainer.appendChild(item);
        });
    }

    // Рендеринг карточек услуг
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer && config.SERVICES && config.SERVICES.length > 0) {
        servicesContainer.innerHTML = '';
        config.SERVICES.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card card-premium';
            
            const detailsHtml = service.details.map(detail => 
                `<li><i class="fa-solid fa-square-check accent" aria-hidden="true"></i> ${detail}</li>`
            ).join('');

            card.innerHTML = `
                <div class="service-header">
                    <h3>${service.title}</h3>
                    <span class="service-price accent">${service.price}</span>
                </div>
                <p>${service.description}</p>
                <ul class="service-details">
                    ${detailsHtml}
                </ul>
            `;
            servicesContainer.appendChild(card);
        });
    }

    // Рендеринг мастеров
    const mastersContainer = document.getElementById('masters-container');
    if (mastersContainer && config.MASTERS && config.MASTERS.length > 0) {
        mastersContainer.innerHTML = '';
        config.MASTERS.forEach(master => {
            const card = document.createElement('div');
            card.className = 'master-card card-premium';

            let socialsHtml = '';
            if (master.socials) {
                // Ссылка на Instagram отключена в РФ
                if (master.socials.instagram && master.socials.instagram !== '#') {
                    socialsHtml += `<a href="${master.socials.instagram}" class="master-social-link" aria-label="Instagram мастера ${master.name}"><i class="fa-brands fa-instagram"></i></a>`;
                }
                if (master.socials.vk && master.socials.vk !== '#') {
                    socialsHtml += `<a href="${master.socials.vk}" class="master-social-link" aria-label="VK мастера ${master.name}"><i class="fa-brands fa-vk"></i></a>`;
                }
                if (master.socials.telegram && master.socials.telegram !== '#') {
                    socialsHtml += `<a href="${master.socials.telegram}" class="master-social-link" aria-label="Telegram мастера ${master.name}"><i class="fa-brands fa-telegram"></i></a>`;
                }
            }

            card.innerHTML = `
                <div class="master-img-wrapper">
                    <img src="${master.image}" alt="Портрет мастера ${master.name}" class="master-img" width="350" height="420" loading="lazy">
                </div>
                <div class="master-info">
                    <h3>${master.name}</h3>
                    <span class="master-role accent">${master.role}</span>
                    <p class="master-bio">${master.bio}</p>
                    <div class="master-socials">
                        ${socialsHtml || `<span class="text-muted">Контакты уточняйте в студии</span>`}
                    </div>
                </div>
            `;
            mastersContainer.appendChild(card);
        });
    }

    // Рендеринг FAQ
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer && config.FAQ && config.FAQ.length > 0) {
        faqContainer.innerHTML = '';
        config.FAQ.forEach((faq, index) => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <div class="faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
                    ${faq.question}
                </div>
                <div class="faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
                    <p>${faq.answer}</p>
                </div>
            `;
            faqContainer.appendChild(item);
        });

        // Навешивание обработчиков событий для аккордеона FAQ
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все открытые элементы
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                // Если текущий был закрыт — открываем его
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }


    /* ==========================================
       2. STICKY HEADER EFFECT
       ========================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       3. MOBILE BURGER MENU
       ========================================== */
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    burgerBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       4. INTERACTIVE TATTOO CALCULATOR
       ========================================== */
    const calcBoxes = document.querySelectorAll('.calc-opt-box');
    const calcPriceEl = document.getElementById('calc-price');
    const calcTimeEl = document.getElementById('calc-time');

    let selectedSizePrice = 8000;
    let selectedSizeTime = '2-3 часа';
    let selectedStyleMultiplier = 1.0;
    let selectedCoverupPrice = 0;

    const calculatePrice = () => {
        const finalPrice = Math.round((selectedSizePrice * selectedStyleMultiplier) + selectedCoverupPrice);
        calcPriceEl.textContent = finalPrice.toLocaleString('ru-RU');
        calcTimeEl.textContent = selectedSizeTime;
    };

    calcBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const category = box.getAttribute('data-name');
            
            document.querySelectorAll(`.calc-opt-box[data-name="${category}"]`).forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            box.classList.add('active');

            if (category === 'size') {
                selectedSizePrice = parseFloat(box.getAttribute('data-price'));
                selectedSizeTime = box.getAttribute('data-time');
            } else if (category === 'style') {
                selectedStyleMultiplier = parseFloat(box.getAttribute('data-multiplier'));
            } else if (category === 'coverup') {
                selectedCoverupPrice = parseFloat(box.getAttribute('data-add'));
            }

            calculatePrice();
        });
    });

    /* ==========================================
       5. МАСКА ВВОДА НОМЕРА ТЕЛЕФОНА
       ========================================== */
    const phoneInput = document.getElementById('user-phone');
    
    phoneInput.addEventListener('input', () => {
        let input = phoneInput.value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
        
        // Корректируем первую цифру (если ввели 7 или 8 в начале)
        if (input.startsWith('7') || input.startsWith('8')) {
            input = input.substring(1);
        }
        
        let formatted = '+7';
        if (input.length > 0) {
            formatted += ' (' + input.substring(0, 3);
        }
        if (input.length >= 4) {
            formatted += ') ' + input.substring(3, 6);
        }
        if (input.length >= 7) {
            formatted += '-' + input.substring(6, 8);
        }
        if (input.length >= 9) {
            formatted += '-' + input.substring(8, 10);
        }
        
        phoneInput.value = formatted.substring(0, 18); // Ограничиваем длину
    });

    phoneInput.addEventListener('keydown', (e) => {
        // Разрешаем стирание +7
        if (phoneInput.value === '+7' && e.key === 'Backspace') {
            phoneInput.value = '';
        }
    });

    /* ==========================================
       6. ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ (DEMO / PROD)
       ========================================== */
    const bookingForm = document.getElementById('booking-form');
    const formSuccess = document.getElementById('form-success');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Функция очистки ошибок
    const clearErrors = () => {
        bookingForm.querySelectorAll('.error-label').forEach(el => el.textContent = '');
        bookingForm.querySelectorAll('.form-input').forEach(el => el.classList.remove('invalid'));
        bookingForm.querySelector('.form-checkbox-group')?.classList.remove('invalid');
    };

    // Функция валидации формы
    const validateForm = () => {
        clearErrors();
        let isValid = true;

        const nameInput = document.getElementById('user-name');
        const contactMethod = document.getElementById('user-contact-method');
        const agreedCheckbox = document.getElementById('user-agreed');

        // Валидация Имени
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            nameInput.classList.add('invalid');
            document.getElementById('name-error').textContent = 'Пожалуйста, введите ваше имя (минимум 2 буквы)';
            isValid = false;
        }

        // Валидация Телефона
        if (!phoneInput.value.trim() || phoneInput.value.length < 18) {
            phoneInput.classList.add('invalid');
            document.getElementById('phone-error').textContent = 'Введите полный номер телефона в формате +7 (999) 999-99-99';
            isValid = false;
        }

        // Валидация способа связи
        if (!contactMethod.value) {
            contactMethod.classList.add('invalid');
            document.getElementById('method-error').textContent = 'Выберите удобный способ связи';
            isValid = false;
        }

        // Валидация согласия
        if (!agreedCheckbox.checked) {
            document.getElementById('agreement-error').textContent = 'Необходимо ваше согласие на обработку данных';
            agreedCheckbox.closest('.form-checkbox-group')?.classList.add('invalid');
            isValid = false;
        }

        return isValid;
    };

    // Обработка отправки формы
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return; // Форма невалидна
        }

        // Включение loading-состояния
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Сбор данных формы
        const formData = {
            name: document.getElementById('user-name').value,
            phone: phoneInput.value,
            contact_method: document.getElementById('user-contact-method').value,
            style: document.getElementById('tattoo-style').value || 'Не указан',
            idea: document.getElementById('user-idea').value || 'Нет описания'
        };

        const successTitle = document.getElementById('success-title');
        const successText = document.getElementById('success-text');

        if (config.FORM_MODE === 'demo') {
            // Имитация отправки в демо-режиме
            setTimeout(() => {
                bookingForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

                if (successTitle && successText) {
                    successTitle.innerHTML = `Зов услышан <span class="accent">(Демо)</span>!`;
                    successText.innerHTML = `
                        Спасибо, <strong>${formData.name}</strong>! Это демонстрационный шаблон сайта.<br>
                        В реальной версии заявка с телефоном <strong>${formData.phone}</strong> 
                        и предпочтением связи в <strong>${formData.contact_method}</strong> была бы отправлена на настроенный эндпоинт.
                    `;
                }

                // Сброс формы
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                bookingForm.reset();
                
                document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
            }, 800);

        } else {
            // Реальная отправка (Production Mode)
            if (!config.FORM_ENDPOINT) {
                // Если эндпоинт забыли настроить
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                alert('Ошибка конфигурации: в режиме production необходимо указать FORM_ENDPOINT в config.js');
                return;
            }

            fetch(config.FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Успешная отправка
                bookingForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

                if (successTitle && successText) {
                    successTitle.textContent = 'Твой зов услышан!';
                    successText.textContent = 'Мастер свяжется с тобой в течение 30 минут, чтобы согласовать время консультации.';
                }

                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                bookingForm.reset();

                document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                // Ошибка отправки (понятная пользователю без stack trace)
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                const phoneError = document.getElementById('phone-error');
                if (phoneError) {
                    phoneError.textContent = 'Не удалось отправить заявку. Проверьте интернет-соединение или свяжитесь с нами напрямую по телефону.';
                } else {
                    alert('Не удалось отправить заявку. Пожалуйста, позвоните нам по телефону или попробуйте позже.');
                }
            });
        }
    });

    // Сброс формы после успеха
    resetFormBtn.addEventListener('click', () => {
        formSuccess.classList.add('hidden');
        bookingForm.classList.remove('hidden');
        clearErrors();
        
        // Сброс select-ов
        document.getElementById('tattoo-style').value = "";
        document.getElementById('user-contact-method').value = "";
    });

    /* ==========================================
       7. SMOOTH NAVIGATION LINK HIGHLIGHTING
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 180)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
