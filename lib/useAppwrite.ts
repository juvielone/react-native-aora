import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: any) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const fetchData = async () => {
    setisLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setisLoading(false);
    }
  };

  const refetch = () => fetchData();
  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetch, isLoading };
};

export default useAppwrite;
