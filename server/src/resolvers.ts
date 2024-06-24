import {Resolvers} from "./types";

export const resolvers: Resolvers = {
    Query: {
        tracksForHome: async (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracksForHome();
        }
    },
    Track: {
        author: async ({authorId}, _, {dataSources}) => {
            return dataSources.trackAPI.getAuthor(authorId);
        }
    }
}