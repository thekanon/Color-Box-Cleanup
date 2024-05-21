import Game from "@/app/containers/GameContainer";
export default function Home() {
  console.log("Home");
  return (
    <div className="flex items-baseline justify-center h-screen">
      <Game />
    </div>
  );
}
