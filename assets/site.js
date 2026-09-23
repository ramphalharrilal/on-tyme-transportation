const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

const rideForm = document.querySelector('[data-ride-form]');
rideForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(rideForm);
  const subject = `Ride inquiry from ${formData.get('name') || 'website visitor'}`;
  const body = [
    'Hello Mrs. A. Jones,',
    '',
    'I would like to ask about an ON TYME ride.',
    '',
    `Name: ${formData.get('name') || ''}`,
    `Phone: ${formData.get('phone') || ''}`,
    `Email: ${formData.get('email') || ''}`,
    `Preferred date: ${formData.get('date') || ''}`,
    `Rider group: ${formData.get('group') || ''}`,
    '',
    'Pickup, destination, and rider details:',
    String(formData.get('details') || ''),
    '',
    'I understand this inquiry does not confirm a ride.',
  ].join('\n');
  const status = rideForm.querySelector('[data-form-status]');
  if (status) status.textContent = window.getSiteLanguage?.() === 'es' ? 'Se abrirá su aplicación de correo. Revise los detalles y pulse Enviar.' : 'Opening your email app. Please review the details, then press Send.';
  window.location.href = `mailto:ontymenow@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement?.querySelector('[data-copy-status]');
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      if (status) status.textContent = window.getSiteLanguage?.() === 'es' ? 'Número copiado. Verifique el destinatario en la aplicación de su banco.' : 'Number copied. Please check the recipient in your banking app.';
    } catch {
      if (status) status.textContent = window.getSiteLanguage?.() === 'es' ? 'No se pudo copiar. Puede escribir el número que aparece arriba.' : 'Copy is unavailable here. You can enter the number shown above.';
    }
  });
});

// Hand-edited Spanish copy; visitors see English unless they choose Spanish.
const spanishCopy = {
  'ON TYME Transportation | Safe • Reliable • On-Tyme': 'ON TYME Transportation | Seguro • Confiable • Puntual',
  'Services | ON TYME Transportation': 'Servicios | ON TYME Transportation',
  'Contact & Ride Inquiry | ON TYME Transportation': 'Contacto y solicitud de viaje | ON TYME Transportation',
  'Payments | ON TYME Transportation': 'Pagos | ON TYME Transportation',
  'Skip to main content': 'Ir al contenido principal',
  'ON TYME Transportation home': 'ON TYME Transportation, inicio',
  'Open menu': 'Abrir menú',
  'Primary': 'Navegación principal',
  'Service qualities': 'Cualidades del servicio',
  'Jump to a service': 'Ir a un servicio',
  'Transportation': 'Transporte',
  'Home': 'Inicio',
  'Services': 'Servicios',
  'Contact': 'Contacto',
  'Payments': 'Pagos',
  'Request a ride': 'Solicitar un viaje',
  'School transportation and more': 'Transporte escolar y mucho más',
  'On time.': 'A tiempo.',
  'Every time.': 'Siempre.',
  'Your time.': 'A su tiempo.',
  'Reliable rides for school-age students, plus scheduled transportation for college, work, appointments, and community life.': 'Viajes confiables para estudiantes en edad escolar y transporte programado a la universidad, al trabajo, a citas y a actividades comunitarias.',
  'Call 346-422-5121': 'Llame al 346-422-5121',
  'Safe': 'Seguro',
  'Reliable': 'Confiable',
  'On-Tyme': 'Puntual',
  'SCHOOL DAYS AND MORE': 'DÍAS DE CLASE Y MUCHO MÁS',
  'Rides planned around real life.': 'Viajes adaptados a la vida diaria.',
  'A diverse group of school-age students walking together outdoors': 'Un grupo diverso de estudiantes caminando juntos al aire libre',
  'School & College': 'Escuela y universidad',
  'Appointments': 'Citas',
  'Work': 'Trabajo',
  'Shopping': 'Compras',
  'Community Activities': 'Actividades comunitarias',
  'School families': 'Familias escolares',
  'School employee and sibling discounts for qualifying bookings': 'Descuentos para empleados escolares y hermanos en viajes que cumplan los requisitos',
  'Ask us for details →': 'Pregúntenos los detalles →',
  'Built around people': 'Pensado para las personas',
  'A ride should feel dependable from the first call to the final stop.': 'Un viaje debe inspirar confianza desde la primera llamada hasta la última parada.',
  'School transportation is a focus, but it is not all we do. ON TYME also plans rides for college students, seniors, and adults with disabilities across the Houston area.': 'El transporte escolar es una prioridad, pero no es lo único que hacemos. ON TYME también organiza viajes para universitarios, adultos mayores y adultos con discapacidades en el área de Houston.',
  'Explore all rider services': 'Conozca todos los servicios',
  'Who we serve': 'A quiénes servimos',
  'Every rider. Every season.': 'Cada pasajero. En toda temporada.',
  'Flexible transportation options for everyday routines and important destinations.': 'Opciones de transporte flexibles para las rutinas diarias y los destinos importantes.',
  'Children & students': 'Niños y estudiantes',
  'Before and after school, summer programs, camps, and planned activities.': 'Viajes antes y después de clases, programas de verano, campamentos y actividades planificadas.',
  'See student rides →': 'Ver viajes escolares →',
  'College students': 'Estudiantes universitarios',
  'Dependable connections to campus, work, appointments, and other destinations.': 'Viajes confiables al campus, al trabajo, a citas y a otros destinos.',
  'See college rides →': 'Ver viajes universitarios →',
  'Seniors & adults': 'Adultos mayores y adultos',
  'Respectful support for appointments, errands, shopping, and community life.': 'Apoyo respetuoso para citas, diligencias, compras y actividades comunitarias.',
  'See adult rides →': 'Ver viajes para adultos →',
  'Adults with disabilities': 'Adultos con discapacidades',
  'Wheelchair-accessible rides may be available; vehicle and boarding needs are confirmed before booking.': 'Puede haber viajes accesibles para sillas de ruedas; confirmamos las necesidades del vehículo y de abordaje antes de reservar.',
  'Explore rider options →': 'Conozca las opciones →',
  'A racially diverse group of adults who use wheelchairs gathered together': 'Un grupo diverso de adultos que usan sillas de ruedas reunidos',
  'Care in every connection.': 'Atención en cada encuentro.',
  'More than a ride': 'Más que un viaje',
  'Respect at every step of the journey.': 'Respeto en cada etapa del viaje.',
  'Transportation is personal. We listen, plan ahead, and communicate clearly so riders and families know what to expect.': 'El transporte es algo personal. Escuchamos, planificamos y nos comunicamos con claridad para que los pasajeros y sus familias sepan qué esperar.',
  'Scheduled around the rider’s needs': 'Programado según las necesidades del pasajero',
  'Clear pickup and destination details': 'Detalles claros de recogida y destino',
  'Friendly, respectful communication': 'Comunicación amable y respetuosa',
  'Careful planning before every trip': 'Planificación cuidadosa antes de cada viaje',
  'Our team': 'Nuestro equipo',
  'Our workers are background-checked and trained for their roles.': 'Verificamos los antecedentes de nuestro personal y lo capacitamos para sus funciones.',
  'Customer experiences': 'Experiencias de clientes',
  'What families are saying.': 'Lo que dicen las familias.',
  'Words shared by ON TYME customers and their families.': 'Palabras compartidas por clientes de ON TYME y sus familias.',
  'Elderly transport': 'Transporte para adultos mayores',
  'My mother has regular doctor appointments, and ON TYME Transportation has been a lifesaver. The driver was patient, helped her in and out of the vehicle, and made sure she felt comfortable the entire ride. Having a service that understands the needs of seniors gives us peace of mind.': 'Mi madre tiene citas médicas frecuentes y ON TYME Transportation ha sido de gran ayuda. El conductor fue paciente, la ayudó a subir y bajar del vehículo y se aseguró de que estuviera cómoda durante todo el viaje. Saber que entienden las necesidades de los adultos mayores nos da tranquilidad.',
  'ON TYME customer': 'Cliente de ON TYME',
  'School runs': 'Viajes escolares',
  'We use ON TYME for our kids’ school drop-offs, and they’ve been consistently reliable. The drivers are friendly, punctual, and safety-conscious. It’s reassuring to know our children are in good hands every morning.': 'Usamos ON TYME para llevar a nuestros hijos a la escuela y siempre han sido confiables. Los conductores son amables, puntuales y atentos a la seguridad. Nos tranquiliza saber que nuestros hijos están en buenas manos cada mañana.',
  'Disability support': 'Apoyo para personas con discapacidad',
  'My brother uses a wheelchair, and ON TYME Transportation provided excellent support. The vehicle was accessible, and the driver took extra care to secure everything properly. It made the trip stress-free and showed they truly care about passengers with special needs.': 'Mi hermano usa silla de ruedas y ON TYME Transportation nos brindó un apoyo excelente. El vehículo era accesible y el conductor aseguró todo con mucho cuidado. El viaje fue tranquilo y demostraron que realmente les importan los pasajeros con necesidades especiales.',
  'Ride inquiry': 'Solicitud de viaje',
  'Tell us about your ride.': 'Cuéntenos sobre su viaje.',
  'Share a few details and your email app will open a message to Mrs. A. Jones. Review it and press Send to complete your inquiry. A ride is not confirmed until she follows up.': 'Comparta algunos detalles y se abrirá un mensaje para la Sra. A. Jones en su aplicación de correo. Revíselo y pulse Enviar. El viaje no estará confirmado hasta que ella le responda.',
  'Before booking': 'Antes de reservar',
  'Please discuss child supervision, mobility devices, boarding assistance, and other rider needs so ON TYME can confirm what is available.': 'Comente las necesidades de supervisión infantil, dispositivos de movilidad, ayuda para abordar y cualquier otra necesidad para que ON TYME pueda confirmar lo que está disponible.',
  'Rider or contact name': 'Nombre del pasajero o contacto',
  'Phone number': 'Número de teléfono',
  'Email address': 'Correo electrónico',
  'Preferred date': 'Fecha preferida',
  'Rider group': 'Tipo de pasajero',
  'Choose one': 'Elija una opción',
  'Child / school-age rider': 'Niño o estudiante en edad escolar',
  'College student': 'Estudiante universitario',
  'Senior': 'Adulto mayor',
  'Individual with a disability': 'Persona con discapacidad',
  'Other adult rider': 'Otro pasajero adulto',
  'Pickup and destination details': 'Detalles de recogida y destino',
  'Share the pickup area, destination, and preferred time. Please leave out medical or other sensitive details.': 'Indique el lugar de recogida, el destino y la hora preferida. No incluya información médica ni otros datos sensibles.',
  'Open email to send inquiry': 'Abrir correo para enviar la solicitud',
  'Questions or an agreed payment?': '¿Preguntas o un pago acordado?',
  'We’re here to help you move forward.': 'Estamos aquí para ayudarle a seguir adelante.',
  'Speak with Mrs. A. Jones about availability, pricing, or a confirmed ride.': 'Hable con la Sra. A. Jones sobre disponibilidad, precios o un viaje confirmado.',
  'Payment information': 'Información de pago',
  'Safe • Reliable • On-Tyme': 'Seguro • Confiable • Puntual',
  'Quick links': 'Enlaces rápidos',
  'Transportation services, schedules, accessibility needs, and service areas must be confirmed directly before booking.': 'Los servicios, horarios, necesidades de accesibilidad y áreas de servicio deben confirmarse directamente antes de reservar.',
  'Photography:': 'Fotografías:',
  'School rides and everyday connections': 'Viajes escolares y conexiones cotidianas',
  'One service.': 'Un servicio.',
  'Many destinations.': 'Muchos destinos.',
  'From before-school pickups to college, work, appointments, errands, and community life.': 'Desde recogidas antes de clases hasta la universidad, el trabajo, las citas, las diligencias y la vida comunitaria.',
  'rider groups,': 'tipos de pasajeros,',
  'one dependable approach': 'una misma atención confiable',
  'Children': 'Niños',
  'College': 'Universidad',
  'Seniors & disability': 'Adultos mayores y discapacidad',
  'Destinations': 'Destinos',
  '01 • Children & school': '01 • Niños y escuela',
  'Support for busy family schedules.': 'Apoyo para los horarios familiares.',
  'Scheduled rides for school-age children help families manage daily routines and keep young riders connected to the places that matter.': 'Los viajes programados para niños en edad escolar ayudan a las familias a organizar sus rutinas y llevar a los jóvenes a los lugares importantes.',
  'Before and after school transportation': 'Transporte antes y después de clases',
  'Summer programs and camps': 'Programas de verano y campamentos',
  'Activities and scheduled destinations': 'Actividades y destinos programados',
  'Appointments arranged with a parent or guardian': 'Citas coordinadas con un padre, madre o tutor',
  'School employee and sibling discounts': 'Descuentos para empleados escolares y hermanos',
  'Available for qualifying bookings. Ask us about eligibility when planning a ride.': 'Disponibles para viajes que cumplan los requisitos. Pregúntenos sobre los criterios al planificar un viaje.',
  'Ask about a child’s ride': 'Pregunte por un viaje para un niño',
  'School days. Summer days. ON-TYME.': 'Días de clase. Días de verano. Siempre puntual.',
  'A diverse group of college students walking together with backpacks': 'Un grupo diverso de universitarios caminando juntos con mochilas',
  'Campus connections that fit real life.': 'Conexiones al campus adaptadas a la vida diaria.',
  '02 • College students': '02 • Estudiantes universitarios',
  'Reliable connections beyond campus.': 'Conexiones confiables más allá del campus.',
  'College life moves fast. Planned transportation can help students reach class, work, appointments, shopping, and other scheduled destinations.': 'La vida universitaria va rápido. El transporte planificado ayuda a llegar a clases, al trabajo, a citas, de compras y a otros destinos.',
  'Campus and class schedules': 'Horarios del campus y de clases',
  'Work and employment': 'Trabajo y empleo',
  'Shopping and errands': 'Compras y diligencias',
  'Appointments and activities': 'Citas y actividades',
  'Plan a college ride': 'Planifique un viaje universitario',
  '03 • Seniors & disability': '03 • Adultos mayores y discapacidad',
  'Thoughtful transportation, centered on the rider.': 'Transporte atento, centrado en el pasajero.',
  'Respectful scheduled rides help seniors and adults with disabilities stay connected to appointments, work, programs, errands, and their communities.': 'Los viajes programados y respetuosos ayudan a adultos mayores y adultos con discapacidades a llegar a citas, trabajos, programas, diligencias y actividades comunitarias.',
  'Medical and therapy appointments': 'Citas médicas y de terapia',
  'Day programs and employment': 'Programas diurnos y empleo',
  'Shopping, errands, and community activities': 'Compras, diligencias y actividades comunitarias',
  'Wheelchair-accessible vehicle and boarding needs confirmed before booking': 'Confirmamos la disponibilidad de vehículos accesibles y la ayuda para abordar antes de reservar',
  'Discuss rider needs': 'Comente las necesidades del pasajero',
  'Stock photo of a diverse group of adults who use wheelchairs sitting together': 'Fotografía de archivo de un grupo diverso de adultos en sillas de ruedas',
  'Care, dignity, and clear communication.': 'Atención, dignidad y comunicación clara.',
  'Popular destinations': 'Destinos frecuentes',
  'Where can ON TYME take you?': '¿A dónde puede llevarlo ON TYME?',
  'School': 'Escuela',
  'Medical appointments': 'Citas médicas',
  'Therapy': 'Terapia',
  'Day programs': 'Programas diurnos',
  'Errands': 'Diligencias',
  'Community activities': 'Actividades comunitarias',
  'Summer programs': 'Programas de verano',
  'Need a destination not listed? Call': '¿Necesita ir a un destino no incluido? Llame al',
  'to ask about availability.': 'para preguntar por la disponibilidad.',
  'Ready to plan a ride?': '¿Listo para planificar un viaje?',
  'Start with a quick conversation.': 'Comencemos con una conversación.',
  'We’re ready to listen': 'Estamos listos para escucharle',
  'Let’s plan your': 'Planifiquemos su',
  'next ride.': 'próximo viaje.',
  'Share the rider, destination, date, and any accessibility needs. Mrs. A. Jones will follow up to discuss availability and details.': 'Indique quién viajará, el destino, la fecha y cualquier necesidad de accesibilidad. La Sra. A. Jones se comunicará con usted para hablar sobre la disponibilidad y los detalles.',
  'Call': 'Llame',
  'Email': 'Correo electrónico',
  'Start with the basics.': 'Comencemos por lo básico.',
  'Complete the form and your email app will open with the details ready to send. Submitting this inquiry does not confirm a ride.': 'Complete el formulario y se abrirá su aplicación de correo con los datos listos para enviar. Enviar la solicitud no confirma un viaje.',
  'Please discuss mobility devices, wheelchair-accessible vehicle availability, boarding assistance, child supervision, and other needs directly with Mrs. A. Jones so she can confirm whether the trip can be accommodated.': 'Hable directamente con la Sra. A. Jones sobre dispositivos de movilidad, disponibilidad de vehículos accesibles, ayuda para abordar, supervisión infantil y otras necesidades para confirmar si se puede realizar el viaje.',
  'Prepare my inquiry': 'Preparar mi solicitud',
  'Ready after your ride is confirmed.': 'Pague después de confirmar su viaje.',
  'Have an agreed amount from Mrs. A. Jones? View the separate payment page for Cash App and Zelle details. Please confirm the recipient before sending.': '¿Ya acordó un importe con la Sra. A. Jones? Consulte la página de pagos para ver Cash App y Zelle. Confirme el destinatario antes de enviar el dinero.',
  'View payment options': 'Ver opciones de pago',
  'Questions?': '¿Preguntas?',
  'Talk with Mrs. A. Jones': 'Hable con la Sra. A. Jones',
  'Pay with': 'Pague con',
  'confidence.': 'confianza.',
  'Please pay only after Mrs. A. Jones has confirmed your ride and the amount due. This page shows payment details; ON TYME does not process payments directly on this website.': 'Pague solo después de que la Sra. A. Jones confirme el viaje y el importe. Esta página muestra los datos de pago; ON TYME no procesa pagos directamente en este sitio.',
  'Confirm your ride': 'Confirme su viaje',
  'Confirm the amount': 'Confirme el importe',
  'Check the recipient': 'Verifique el destinatario',
  'Two ways to pay': 'Dos maneras de pagar',
  'Choose the method you prefer.': 'Elija el método que prefiera.',
  'Use the amount agreed with Mrs. A. Jones. A payment does not by itself confirm a ride.': 'Use el importe acordado con la Sra. A. Jones. Un pago por sí solo no confirma el viaje.',
  '01 / CASH APP': '01 / CASH APP',
  'Pay with Cash App': 'Pagar con Cash App',
  'Open the Cash App profile below and verify the displayed recipient before you send.': 'Abra el perfil de Cash App y verifique el destinatario que aparece antes de enviar el pago.',
  'Cash App handle': 'Usuario de Cash App',
  'Open Cash App': 'Abrir Cash App',
  '02 / ZELLE': '02 / ZELLE',
  'Pay with Zelle': 'Pagar con Zelle',
  'Open Zelle in your bank or credit union app and enter the number below. Confirm the displayed recipient name before sending.': 'Abra Zelle en la aplicación de su banco o cooperativa de crédito e introduzca el número de abajo. Confirme el nombre del destinatario antes de enviar el pago.',
  'Zelle phone number': 'Número de Zelle',
  'Copy Zelle number': 'Copiar número de Zelle',
  'Before you send': 'Antes de enviar',
  'Double-check the recipient and amount with Mrs. A. Jones, especially if the name shown in your payment app is unfamiliar. For a receipt or any payment question, call': 'Verifique el destinatario y el importe con la Sra. A. Jones, especialmente si no reconoce el nombre que muestra su aplicación. Para recibos o preguntas sobre pagos, llame al',
  'or email': 'o escriba a',
  '. Do not include medical or other sensitive details in the payment note.': '. No incluya información médica ni otros datos sensibles en la nota del pago.',
};

const savedLanguage = (() => { try { return localStorage.getItem('onTymeLanguage'); } catch { return null; } })();
let siteLanguage = savedLanguage === 'es' ? 'es' : 'en';
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    return parent && !parent.closest('script, style, svg, .spanish-notice') && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  },
});
while (walker.nextNode()) textNodes.push([walker.currentNode, walker.currentNode.nodeValue]);
const attributes = [];
document.querySelectorAll('[alt], [aria-label], [placeholder], [title]').forEach((element) => {
  ['alt', 'aria-label', 'placeholder', 'title'].forEach((name) => {
    const original = element.getAttribute(name);
    if (original) attributes.push([element, name, original]);
  });
});
const englishTitle = document.title;
const switchButton = document.createElement('button');
switchButton.type = 'button';
switchButton.className = 'language-switch';
switchButton.innerHTML = '<span class="language-icon" aria-hidden="true">🌐</span><span class="language-label"></span>';
document.body.append(switchButton);

function localized(original) {
  const clean = original.trim().replace(/\s+/g, ' ');
  const replacement = spanishCopy[clean];
  if (!replacement) return original;
  return original.replace(original.trim(), replacement);
}

function applyLanguage() {
  textNodes.forEach(([node, original]) => { node.nodeValue = siteLanguage === 'es' ? localized(original) : original; });
  attributes.forEach(([element, name, original]) => { element.setAttribute(name, siteLanguage === 'es' ? localized(original) : original); });
  document.title = siteLanguage === 'es' ? (spanishCopy[englishTitle] || englishTitle) : englishTitle;
  document.documentElement.lang = siteLanguage;
  switchButton.querySelector('.language-label').textContent = siteLanguage === 'es' ? 'English' : 'Español';
  switchButton.setAttribute('aria-label', siteLanguage === 'es' ? 'Cambiar el sitio a inglés' : 'Switch website to Spanish');
  switchButton.setAttribute('title', siteLanguage === 'es' ? 'Cambiar el sitio a inglés' : 'Switch website to Spanish');
}

switchButton.addEventListener('click', () => {
  siteLanguage = siteLanguage === 'en' ? 'es' : 'en';
  try { localStorage.setItem('onTymeLanguage', siteLanguage); } catch { /* local choice only */ }
  applyLanguage();
});
window.getSiteLanguage = () => siteLanguage;
applyLanguage();

