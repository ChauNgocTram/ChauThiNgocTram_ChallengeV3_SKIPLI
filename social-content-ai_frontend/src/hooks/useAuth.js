import { useMutation, useQuery } from "@tanstack/react-query";
import { alert } from "../components/Alert/Alert";
import { fetchUserGeneratedContents, saveGeneratedContent, sendVerificationCode, validateAccessCode } from "../api/authService";

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: (phoneNumber) => sendVerificationCode(phoneNumber),
    onSuccess: (data, phoneNumber) => {
      localStorage.setItem("phoneNumber", phoneNumber);

      alert.alertSuccessWithTime(
        `Access code has been sent to ${phoneNumber}`,
        "",
        2000,
        "25",
        () => {}
      );
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Error",
        error.response?.data?.error || error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

export const useValidateAccessCode = () => {
  return useMutation({
    mutationFn: ({ accessCode }) => {
      const phoneNumber = localStorage.getItem("phoneNumber");
      if (!phoneNumber) {
        throw new Error("Phone number is not available in local storage");
      }
      return validateAccessCode(phoneNumber, accessCode);
    },
    onSuccess: (data) => {
      if (data.success) {
        alert.alertSuccessWithTime(
          "Access code validated successfully!",
          "",
          2000,
          "25",
          () => {}
        );

        window.location.href = "/";
      } else {
        alert.alertFailedWithTime("Invalid access code", 2000, "25", () => {});
      }
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Error",
        error.response?.data?.error || error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

export const useSaveGeneratedContent = () => {
  return useMutation({
    mutationFn: ({ topic, data, phone_number }) => saveGeneratedContent(topic, data, phone_number),
    onSuccess: (data) => {
      alert.alertSuccessWithTime(
        "Content saved successfully!",
        "",
        2000,
        "25",
        () => {}
      );
      return data; 
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Error",
        error.response?.data?.error || error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

export const useUserGeneratedContents = (phoneNumber) => {
  return useQuery({
    queryKey: ['userGeneratedContents', phoneNumber],
    queryFn: () => fetchUserGeneratedContents(phoneNumber),
    enabled: !!phoneNumber, 
  });
};
