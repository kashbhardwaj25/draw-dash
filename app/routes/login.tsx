import { useEffect, useState } from "react";
import TldrawComponent from "../TldrawComponent.client";

const Login = () => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? <TldrawComponent /> : null;
};

export default Login;
