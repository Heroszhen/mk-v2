const useEnvStore = create((set, get) => ({
    env: null,
    fetchEnv: async () => {
        try {
            let response = await fetch('/env.json');
            response = await response.json();
            set((state) => ({env: response}));
            return response;
        } catch (err) {
            console.log(err);
        }
    }
}));
export default useEnvStore;