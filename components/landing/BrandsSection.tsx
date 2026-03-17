const BRANDS = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png' },
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/1200px-Dell_Logo.png' },
  { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png' },
  { name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Logitech_logo_2015.svg/2560px-Logitech_logo_2015.svg.png' },
];

export default function BrandsSection() {
  return (
    <section className="py-10 sm:py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 sm:mb-8">
          Authorized Retailer of Top Brands
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {BRANDS.map(({ name, logo }) => (
            <div key={name} className="flex items-center justify-center p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-300 hover:bg-white transition-all group cursor-pointer h-14 sm:h-16">
              <img
                src={logo}
                alt={name}
                className="h-5 sm:h-6 w-auto object-contain opacity-50 group-hover:opacity-80 transition-opacity grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
