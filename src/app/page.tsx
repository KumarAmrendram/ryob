import Hero from "@/components/Hero";
import RentYourOwnBoyfriend from "@/components/RentYourOwnBoyfriend";
import Form from "@/components/Form";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero/>
      <RentYourOwnBoyfriend/>
      <Form/>
      <Footer/>
    </main>
  );
}
