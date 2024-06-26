'use client'
import {CustomFilter, Hero, SearchBar, CarCard,ShowMore} from "@/components";
import {fetchCars} from "@/utils";
import {fuels, yearsOfProduction} from "@/constants";
import React, {useEffect, useState} from "react";
import Image from "next/image";

export default  function Home() {
    // const allCars = await fetchCars({ in this wat used with server side component and pass searchParams as pramater to Home
    //     manufacture:searchParams.manufacture || '',
    //     year:searchParams.year || 2023,
    //     fuel:searchParams.fuel || '',
    //     limit:searchParams.limit || 10,
    //     model:searchParams.model || ''
    // });
    const [allCars, setAllCars] = useState([])
    const [loading, setLoading] = useState(false)

    //search state
    const [manufacture, setManufacture] = useState("")
    const [model, setModel] = useState("")

    //filter state
    const [fuel, setFuel] = useState("")
    const [year, setYear] = useState(2023)

    //pagination state
    const [limit, setLimit] = useState(10)

    const getCars = async () => {
        setLoading(true)
        try {
            const result = await fetchCars({
                manufacture:manufacture || '',
                year:year || 2023,
                fuel:fuel || '',
                limit:limit || 10,
                model:model || ''
            });
            setAllCars(result)
        }catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(manufacture,model,fuel,year,limit)
        getCars()

    }, [manufacture,model,fuel,year,limit]);

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
                    <SearchBar
                        setManufacture={setManufacture}
                        setModel ={setModel}
                    />
                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
                        <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
                    </div>
                </div>
                {allCars.length > 0 ? (
                    <section>
                        <div className='home__cars-wrapper'>
                            {allCars?.map((car) => <CarCard car={car}/>)}
                        </div>
                        {loading && (
                            <div className="w-full mt-16 flex-center">
                                <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain"/>
                            </div>
                        )}
                        <ShowMore
                            pageNumber = {limit /10} //want show 10 cars per page and give number of page
                            isNext = { limit > allCars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className='home__error-container'>
                        <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
                        <p>{allCars?.message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
