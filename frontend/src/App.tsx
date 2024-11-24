import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl text-orange-400">Hello</h1>
      <Button>Submit</Button>
    </QueryClientProvider>
  );
}

export default App;
