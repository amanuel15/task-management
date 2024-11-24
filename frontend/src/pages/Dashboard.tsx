import useAuthStore from "@/state/store";

export default function Dashboard() {
  const username = useAuthStore((state) => state.name);
  return (
    <div>
      Dashboard
      <h1 className="text-3xl text-orange-400">Hello {`${username}`}</h1>
    </div>
  );
}
