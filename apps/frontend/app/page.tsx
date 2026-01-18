import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screem h-screen flex justify-center items-center">
      <div>
        <h1>Exaclidraw Frontend</h1>
        <input type="text" className="bg-white" placeholder="name"></input>
      </div>
    </div>
  );
}
