import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const endpoint = 'https://api.thegraph.com/subgraphs/name/zinhunter/guilds'
const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
});

export default async function MemberList(slug) {
    const MEMBERS_QUERY = `
     query{
        members(where: {guild: "${slug}"}) {
            member
        }
      }
    `;

    let data = await client.query({query: gql(MEMBERS_QUERY)});

    return data;
}

