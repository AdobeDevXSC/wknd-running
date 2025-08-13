import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// export const context = () => {
//   const randomNumber = Math.random().toString(36).substring(2, 15)
//   return {
//       env : "https://publish-p24020-e1677029.adobeaemcloud.com",
//       project : "v0",
//       const endpoint = `${aemEnvironment}/graphql/execute.json/${projectName}/screenByPath;path=/content/dam/v0/home/home;variation=master?_=${randomNumber}`

//   }
// }
