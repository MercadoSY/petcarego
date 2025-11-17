import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import spriteHref from '../assets/sprite.svg';

// --- Style & Content Configuration ---
// Edit these values to easily change the page's appearance.

const styleConfig = {
    text: {
        sectionTitle: 'text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl',
        sectionSubtitle: 'mx-auto max-w-3xl text-lg text-slate-600 sm:text-xl',
        body: 'text-base text-slate-600 sm:text-lg',
    },
    colors: {
        background: {
            about: 'bg-amber-50', // This is now overridden by gradients but kept for reference
            partner: 'bg-darkOrange-300/20', // This is now overridden by gradients but kept for reference
        },
        button: 'bg-darkOrange-600 hover:bg-darkOrange-500 focus:ring-darkOrange-300 text-white',
    },
};

// --- Gallery Images Data ---
const galleryImages = [
    { src: 'https://c.pxhere.com/photos/8a/09/dog_pet_cute_doggy_little_happy_cheerful_question-743323.jpg!d', alt: 'Happy questioning dog' },
    { src: 'https://c.pxhere.com/photos/9e/73/cat_sweet_kitty_animals-974997.jpg!d', alt: 'Sweet kitty' },
    { src: 'https://c.pxhere.com/photos/a6/88/bearded_dragon_reptile_talking_intelligent_persuading_wildlife_pet_scaly-753199.jpg!d', alt: 'Bearded dragon' },
    { src: 'https://c.pxhere.com/images/77/8e/315bbdcb829ea7e38f55f389985f-1604050.jpg!d', alt: 'Playful dog' },
    { src: 'https://c.pxhere.com/photos/2d/f2/golden_retriever_puppy_happy_jumping_play_playful_dog_golden-1279753.jpg!d', alt: 'Jumping golden retriever puppy' },
    { src: 'https://c.pxhere.com/photos/1e/1f/autumn_dog_pet_smile_leaves_animal_happy_golden-265589.jpg!d', alt: 'Smiling dog in autumn leaves' },
    { src: 'https://c.pxhere.com/photos/3a/1e/cat_animal_pet_yawn_whisker-37816.jpg!d', alt: 'Yawning cat' },
    { src: 'https://c.pxhere.com/photos/76/ca/hamster_animal_pet_cute_hamsters_hallo_kitty-1131255.jpg!d', alt: 'Cute hamster' },
    { src: 'https://c.pxhere.com/photos/57/f3/pit_bull_terrier_mix_head_dog_bull_pet_animal_pit-1110916.jpg!d', alt: 'Pit bull terrier' },
    { src: 'https://c.pxhere.com/photos/14/d7/guinea_pig_animal_small_fuzz_adorable_furry_friend-486681.jpg!d', alt: 'Adorable guinea pig' },
    { src: 'https://c.pxhere.com/photos/90/6b/birds_lori_animal_lori_red_beak_colors_rainbow_lorikeet_animals-1324529.jpg!d', alt: 'Colorful rainbow lorikeet' },
    { src: 'https://c.pxhere.com/photos/ba/8b/snake_orange_animal_creature_snakeskin_species_pet-751679.jpg!d', alt: 'Orange corn snake' },
];

/**
 * @description The main landing page for PetCareGo, introducing the service to users.
 */
const Landing: React.FC = () => {
    const [showArrow, setShowArrow] = useState(true);
    const [showFab, setShowFab] = useState(false);
    const heroButtonRef = useRef<HTMLAnchorElement>(null);
    const [formData, setFormData] = useState({
        clinicName: '',
        contactName: '',
        email: '',
        clinicAddress: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send this data to a server.
        // For this demo, we'll just log it and show an alert.
        console.log('Form submitted:', formData);
        alert(`Thank you for your inquiry, ${formData.contactName}! We will get back to you soon.`);
        setFormData({
            clinicName: '',
            contactName: '',
            email: '',
            clinicAddress: '',
            message: '',
        });
    };

    // Effect to handle visibility of the scroll-down arrow
    useEffect(() => {
        const handleScroll = () => {
            setShowArrow(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to handle visibility of the Floating Action Button
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show the FAB when the hero button is not on screen
                setShowFab(!entry.isIntersecting);
            },
            { threshold: 0.1 } // Trigger when less than 10% of the button is visible
        );

        const currentRef = heroButtonRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div className="font-sans text-slate-800">
            {/* Hero Section */}
            <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-amber-100/80 text-center border-b-2 border-gray-200">
                {/* SVG Background Pattern */}
                <div className="absolute top-0 left-0 h-full w-full transform bg-hero-pattern bg-repeat opacity-10 scale-150 -rotate-12 will-change-transform"></div>
                <div className="relative z-10 p-8">
                    <svg className="mx-auto mb-6 h-36 w-36" aria-label="PetCareGo Logo" role="img">
                        <use href={`${spriteHref}#pet-shop`} />
                    </svg>
                    <h1 className="font-display text-6xl font-extrabold text-brandOrange drop-shadow-title sm:text-8xl lg:text-9xl">PetCareGo</h1>
                    <p className="mt-4 text-base text-slate-600 sm:text-xl md:text-2xl">Your one-stop solution for finding the best local veterinary care.</p>
                    <Link
                        ref={heroButtonRef}
                        to="/find-a-store"
                        className={`mt-8 inline-flex items-center gap-3 transform rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 sm:px-10 sm:py-4 sm:text-xl ${styleConfig.colors.button}`}
                    >
                        <span>Find a Vet Near You</span>
                        <svg className="h-8 w-8" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                            <use href={`${spriteHref}#arrow-right-thick`} />
                        </svg>
                    </Link>
                </div>
                {/* Scroll Down Arrow */}
                <a
                    href="#features"
                    aria-label="Scroll to next section"
                    className={`absolute bottom-10 z-10 transition-opacity duration-300 ${showArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <div className="animate-bounce rounded-full bg-white/30 p-2">
                        <svg className="h-10 w-10 text-slate-700" aria-hidden="true">
                            <use href={`${spriteHref}#arrow-bottom`} />
                        </svg>
                    </div>
                </a>
            </header>

            {/* Features Section */}
            <section id="features" className="bg-gradient-to-b from-amber-50 to-stone-50 py-20 sm:py-24 px-4 sm:px-6 text-center">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <svg className="h-12 w-12" aria-hidden="true">
                            <use href={`${spriteHref}#star`} />
                        </svg>
                        <h2 className={styleConfig.text.sectionTitle}>Why Choose Us?</h2>
                    </div>
                    <p className={`mt-4 mb-12 ${styleConfig.text.sectionSubtitle}`}>We make pet care simple, accessible, and stress-free for both you and your furry friends.</p>
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Card 1 */}
                        <div className="flex flex-col items-center rounded-3xl border border-transparent bg-orange-50 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-darkOrange-300 hover:shadow-glow-orange">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500">
                                <svg className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                                    <use href={`${spriteHref}#search-normal`} />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-2xl font-semibold">Easy Search</h3>
                            <p className="text-base text-slate-600">Quickly find top-rated veterinary clinics in your area with our simple search interface.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="flex flex-col items-center rounded-3xl border border-transparent bg-brandBlue-100 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-brandBlue-300 hover:shadow-glow-blue">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brandBlue-500">
                                <svg className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                                    <use href={`${spriteHref}#bookmark`} />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-2xl font-semibold">Online Booking</h3>
                            <p className="text-base text-slate-600">Book appointments 24/7 directly through our platform. No more waiting on the phone.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="flex flex-col items-center rounded-3xl border border-transparent bg-purple-100 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-glow-purple">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500">
                                <svg className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                                    <use href={`${spriteHref}#code`} />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-2xl font-semibold">Custom Vet Pages</h3>
                            <p className="text-base text-slate-600">Each partner clinic gets a beautiful, easy-to-navigate website designed by us.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-gradient-to-b from-stone-50 to-amber-100 py-20 sm:py-24 px-4 sm:px-6">
                <div className="container mx-auto grid items-center gap-12 text-center md:grid-cols-2 md:text-left">
                    <img src="https://c.pxhere.com/photos/39/6f/cat_red_cute_mackerel_tiger_sweet_cuddly_animal-676175.jpg!d" alt="A cute red cat" className="mx-auto w-full max-w-lg rounded-3xl shadow-xl" />
                    <div>
                        <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-start">
                            <svg className="h-10 w-10" aria-hidden="true">
                                <use href={`${spriteHref}#pawprints`} />
                            </svg>
                            <h2 className={styleConfig.text.sectionTitle}>About PetCareGo</h2>
                        </div>
                        <p className={`mb-4 ${styleConfig.text.body}`}>PetCareGo was created to bridge the gap between pet owners and veterinary clinics. We partner with local vets to bring their services online, providing them with beautiful, custom-designed websites.</p>
                        <p className={styleConfig.text.body}>Our mission is to make it easier for you to find and book appointments for your beloved pets, ensuring they get the care they deserve.</p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="bg-gradient-to-b from-amber-100 to-stone-50 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <svg className="h-12 w-12" aria-hidden="true">
                            <use href={`${spriteHref}#camerawithflash`} />
                        </svg>
                        <h2 className={styleConfig.text.sectionTitle}>Happy Clients</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {galleryImages.map((image, index) => (
                            <img key={index} src={image.src} alt={image.alt} className="h-full w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-105" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Video Section */}
            <section id="demo" className="bg-gradient-to-b from-stone-50 to-themeBlue-400 py-20 sm:py-24 px-4 sm:px-6 text-center">
                <div className="container mx-auto">
                    <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <svg className="h-12 w-12" aria-hidden="true">
                            <use href={`${spriteHref}#blackquestionmark`} />
                        </svg>
                        <h2 className={styleConfig.text.sectionTitle}>See How It Works</h2>
                    </div>
                    <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-lg bg-slate-300 shadow-xl">
                        <iframe
                            className="absolute top-0 left-0 h-full w-full"
                            src="https://www.youtube.com/embed/nLBd1F5fX7A?si=5-bAlVDI8zE3AECu"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Partner Section */}
            <section id="partner" className="bg-gradient-to-b from-themeBlue-400 to-stone-50 py-20 sm:py-24 px-4 sm:px-6 text-center">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <svg className="h-12 w-12" aria-hidden="true">
                            <use href={`${spriteHref}#hospital`} />
                        </svg>
                        <h2 className={styleConfig.text.sectionTitle}>Grow Your Clinic with Us</h2>
                    </div>
                    <p className={`mt-4 mb-8 ${styleConfig.text.sectionSubtitle}`}>Join our network of trusted veterinary clinics. We'll provide you with a beautiful, custom-designed webpage and connect you with thousands of pet owners in your area.</p>

                    {/* --- Contact Form --- */}
                    <div className="mx-auto mt-12 max-w-2xl">
                        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-lg backdrop-blur-sm sm:p-10">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="clinicName" className="block text-left text-sm font-semibold leading-6 text-slate-700">
                                            Clinic Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="clinicName"
                                                id="clinicName"
                                                value={formData.clinicName}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-darkOrange-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="contactName" className="block text-left text-sm font-semibold leading-6 text-slate-700">
                                            Contact Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="contactName"
                                                id="contactName"
                                                value={formData.contactName}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-darkOrange-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-left text-sm font-semibold leading-6 text-slate-700">
                                            Email Address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-darkOrange-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="clinicAddress" className="block text-left text-sm font-semibold leading-6 text-slate-700">
                                            Clinic Address
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="clinicAddress"
                                                id="clinicAddress"
                                                rows={3}
                                                value={formData.clinicAddress}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-darkOrange-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-left text-sm font-semibold leading-6 text-slate-700">
                                            Message
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-darkOrange-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button type="submit" className={`w-full transform rounded-full px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 ${styleConfig.colors.button}`}>
                                        Partner With Us
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-slate-800 pt-16 pb-8 text-white">
                <div className="container mx-auto flex flex-col items-center px-6 text-center">
                    <div className="flex items-center">
                        <svg className="mr-3 h-10 w-10" aria-label="PetCareGo Logo" role="img">
                            <use href={`${spriteHref}#pet-shop`} />
                        </svg>
                        <span className="text-2xl font-bold">PetCareGo</span>
                    </div>
                    <p className="mt-4 max-w-md text-slate-400 italic">"Until one has loved an animal, a part of one's soul remains unawakened."</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
                        <a href="mailto:contact@petcarego.com" className="flex items-center gap-2 text-slate-300 hover:text-white">
                            <svg className="h-5 w-5" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                                <use href={`${spriteHref}#call-incoming`} />
                            </svg>
                            <span>contact@petcarego.com</span>
                        </a>
                        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white">
                            <svg className="h-5 w-5" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                                <use href={`${spriteHref}#github`} />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} PetCareGo. All rights reserved.</p>
                </div>
            </footer>

            {/* Floating Action Button */}
            <Link
                to="/find-a-store"
                className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 transform rounded-full p-4 text-lg font-semibold shadow-2xl transition-all duration-300 ease-in-out sm:px-8 sm:py-5
                ${styleConfig.colors.button}
                ${showFab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
                <svg className="h-7 w-7" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                    <use href={`${spriteHref}#search-normal`} />
                </svg>
                <span className="hidden sm:inline">Find a Vet</span>
            </Link>
        </div>
    );
};

export default Landing;