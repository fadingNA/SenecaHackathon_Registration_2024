import { CollegeList } from "../interface/type";
import { getAllCollege } from "./data/firebase";

class CollegeModel {
  async getCollegeList(): Promise<CollegeList[]> {
    try {
      const collegeList = await getAllCollege();
      return collegeList;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async convertCollegeListToJson(collegeList: CollegeList[]): Promise<string> {
    try {
      return JSON.stringify(collegeList);
    } catch (err) {
      console.log(err);
      return "";
    }
  }
}

export default new CollegeModel();
