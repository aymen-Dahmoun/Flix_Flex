import { useNavigationState } from "@react-navigation/native";

export default function useActiveRouteName() {

    return useNavigationState((state) => {
        const getActive = (s) => {
        const route = s.routes[s.index];
        return route.state ? getActive(route.state) : route.name;
    };
    return getActive(state);
  });
}
