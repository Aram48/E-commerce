import { BestSeller } from "../components/BestSeller"
import { Hero } from "../components/Hero"
import { LatestCollection } from "../components/LatestCollection"
import { NewsLetterBox } from "../components/NewsLetterBox"
import { OurPolicy } from "../components/OurPolicy"

export const Home = () => {
    return <>
        <div>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsLetterBox />
        </div>
    </>
}