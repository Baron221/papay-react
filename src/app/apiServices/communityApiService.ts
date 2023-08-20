import assert from "assert";
import { serviceApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import axios from "axios";
import { BoArticles, SearchArticlesObj, SearchMemberArticlesObj } from "../../app/types/boArticle";



class CommunityApiService {
    private readonly path: string;
    constructor() {
        this.path = serviceApi;
    }

    public async getTargetArticles(data: SearchArticlesObj) {
        try {
            let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
            if (data.order) url += `&order=${data.order}`;

            const result = await axios.get(this.path + url, {
                withCredentials: true,
            })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);

            const articles: BoArticles[] = result.data.data;
            return articles;
        } catch (error: any) {
            console.log(`ERROR::: getTargetArticles ${error.message}`);
            throw error;
        }
    }


    
    public async getMemberCommunityArticles(data: SearchMemberArticlesObj) {
        try {
            let url = `/community/target?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
            const result = await axios.get(this.path + url, {
                withCredentials: true,
            })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);
            console.log("state:" , result.data.data);

            const articles: BoArticles[] = result.data.data;
            return articles;
        } catch (error: any) {
            console.log(`ERROR::: getMemberCommunityArticles ${error.message}`);
            throw error;
        }
    }

    public async getChosenArticle(art_id: string) {
        try {
            let url = `/community/single-article/${art_id}`;
            const result = await axios.get(this.path + url, {
                withCredentials: true,
            })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);
            
            const articles: BoArticles= result.data.data;
            return articles;
        } catch (error: any) {
            console.log(`ERROR::: getMemberCommunityArticles ${error.message}`);
            throw error;
        }
    }





}


export default CommunityApiService;