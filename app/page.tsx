import Image from "next/image";
import {CustomFilter, Hero, SearchBar, CarCard} from "@/components";
import {fetchCars} from "@/utils";
import {fuels, yearsOfProduction} from "@/constants";

export default async function Home({searchParams}) {
    const allCars = await fetchCars({
        manufacture:searchParams.manufacture || '',
        year:searchParams.year || 2023,
        fuel:searchParams.fuel || '',
        limit:searchParams.limit || 10,
        model:searchParams.model || ''
    });
    // verify if allCars is empty
    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars; // if any of these is true so data is empty
    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore the cars you might like</p>
                </div>
                <div className="home__filters">
                    <SearchBar/>
                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels}/>
                        <CustomFilter title="years" options={yearsOfProduction}/>
                    </div>
                </div>
                {!isDataEmpty ? (
                    <section>{allCars?.map((car) => <CarCard car={car}/>)}</section>
                ) : (
                    <div>
                        <h2>Oops, no result</h2>
                    </div>
                )}
            </div>
        </main>
    );
}
