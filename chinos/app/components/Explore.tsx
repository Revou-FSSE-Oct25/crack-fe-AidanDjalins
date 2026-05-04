import Image from "next/image";

export default function Explore() {
    return (
        <section className="bg-[var(--color-cream)] py-12 xl:py-0 xl:h-[90vh] xl:w-screen">
            <div className="container mx-auto xl:w-full xl:h-full flex xl:justify-center xl:items-center">
                <div className="w-full flex flex-col lg:flex-row gap-12 xl:gap-20">     
                    <div className="flex-1 flex flex-col justify-around items-end text-center xl:text-left gap-12 xl:gap-0 max-w-[400px] 
                    mx-auto xl:max-w-none xl:mx-0">
                        <div className="relative flex items-start">
                            {/* quote 1 */}
                            <div className="xl:max-w-[420px] xl:text-right xl:flex xl:flex-col xl:items-end">
                                <div className="mb-6 flex justify-center">
                                    <Image 
                                    src="/icons/drink-coffee-s-svgrepo-com.svg"
                                    width={56}
                                    height={56}
                                    alt="explore icon 1"
                                    />
                                </div>
                                <h3 className="text-3xl xl:text-4xl font-bold">Mellow Espresso</h3>
                                <p className="max-w-[400px] mt-2">Have a cup of our espresso blends! We guarantee it will mellow out the day</p>
                            </div>
                        </div>
                        <div className="relative flex items-start">
                            {/* quote 2 */}
                            <div className="xl:max-w-[420px] xl:text-right xl:flex xl:flex-col xl:items-end">
                                <div className="mb-6 flex justify-center">
                                    <Image 
                                    src="/icons/coffee-cup-svgrepo-com.svg"
                                    width={56}
                                    height={56}
                                    alt="explore icon 1"
                                    />
                                </div>
                                <h3 className="text-3xl xl:text-4xl font-bold">Brewed Bar</h3>
                                <p className="max-w-[400px] mt-2">A brew or two will help ease in to the day, as flavors pop in your mouth</p>
                            </div>
                        </div>
                    </div>
                    {/* Coffee Cup Image */}
                    <div className="hidden xl:flex justify-center">
                        <div className="relative w-[322px] h-[580px]">
                            <Image 
                            src="/images/coffee_cup_pngtree.png"
                            fill
                            alt="Picture of coffee cup"
                            className="object-cover"
                            quality={100}
                            priority
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-around items-start text-center xl:text-left gap-12 xl:gap-0 max-w-[400px] 
                    mx-auto xl:max-w-none xl:mx-0">
                        <div className="relative flex items-start">
                            {/* quote 3 */}
                            <div className="xl:max-w-[420px] xl:text-left xl:flex xl:flex-col xl:items-start">
                                <div className="mb-6 flex justify-center">
                                    <Image 
                                    src="/icons/ice-cold-drink-svgrepo-com.svg"
                                    width={56}
                                    height={56}
                                    alt="explore icon 1"
                                    />
                                </div>
                                <h3 className="text-3xl xl:text-4xl font-bold">Ice Delights</h3>
                                <p className="max-w-[400px] mt-2">A scorching hot day calls for a cooling refreshment, surely to sooth the soul</p>
                            </div>
                        </div>
                        <div className="relative flex items-start">
                            {/* quote 4 */}
                            <div className="xl:max-w-[420px] xl:text-left xl:flex xl:flex-col xl:items-start">
                                <div className="mb-6 flex justify-center">
                                    <Image 
                                    src="/icons/food-restaurant-svgrepo-com.svg"
                                    width={56}
                                    height={56}
                                    alt="explore icon 1"
                                    />
                                </div>
                                <h3 className="text-3xl xl:text-4xl font-bold">Menu Food</h3>
                                <p className="max-w-[400px] mt-2">Is that stomach rumbling, I hear? Our bites will satiate your appetite</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};