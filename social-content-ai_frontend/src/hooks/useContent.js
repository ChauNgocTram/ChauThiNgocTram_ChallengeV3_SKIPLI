import { useMutation } from "@tanstack/react-query";
import {
  generatePostCaptions
} from "../api/contentService";
import { alert } from "../components/Alert/Alert";

export const useGenerateCaptions = () => {
  return useMutation({
    mutationFn: ({ socialNetwork, subject, tone }) =>
      generatePostCaptions({ socialNetwork, subject, tone }),
    onSuccess: (data) => {},
    onError: (error) => {
      alert.alertFailedWithTime(
        "Error generating captions",
        error.response?.data?.error || error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};


