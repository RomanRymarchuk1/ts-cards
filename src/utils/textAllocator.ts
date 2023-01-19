import createReg from "./createReg";
import textReduction from "./textReduction";

const textAllocator = (text: string, words: string[], isDescription: boolean): string => {
   let finalText: string = isDescription ? textReduction(text, 100) : text;

   words.forEach((keyWord: string) => {
      const re = createReg(keyWord);

      if (re.test(finalText)) {
         const a = finalText.match(re);

         a?.forEach((el) => {
            finalText = finalText.replace(re, `<span className="desired" >${el}</span>`);
         });
      }
   });

   return finalText;
};

export default textAllocator;
