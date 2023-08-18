// i use this fill as a single file that's going export all of our components
import Hero from "./Hero";
import CustomButton from "./CustomButton";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import CustomFilter from "./CustomFilter";
import SearchManufacturer from "./SearchManufacturer"; // can also write like that => import {SearchManufacturer} from './'
import CarCard from "@/components/CarCard";
import CarDetails from "@/components/CarCard";
import ShowMore from "@/components/ShowMore"
export {
  Hero,
  CustomButton,
  Navbar,
  Footer,
  SearchBar,
  CustomFilter,
  SearchManufacturer,
  CarCard,
  CarDetails,
  ShowMore
};
