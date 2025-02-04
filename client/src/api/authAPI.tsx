export const login = async (username: string, password: string) => {
  try {
      const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
          throw new Error("Invalid username or password");
      }

      return response.json();
  } catch (error) {
      console.error(error);
      throw error;
  }
};
