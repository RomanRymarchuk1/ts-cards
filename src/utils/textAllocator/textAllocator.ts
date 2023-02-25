import createReg from "../createReg/createReg";
import textReduction from "../textReduction/textReduction";

const textAllocator = (text: string, words: string[], isDescription: boolean): string => {
   let finalText: string = isDescription ? textReduction(text, 100) : text;

   words.forEach((keyWord: string) => {
      const reg = createReg(keyWord);

      if (reg.test(finalText)) {
         const matchArr = finalText.match(reg);

         matchArr?.forEach((el) => {
            finalText = finalText.replace(reg, `<span className="desired" >${el}</span>`);
         });
      }
   });

   return finalText;
};

export default textAllocator;
