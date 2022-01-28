import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const endpoint = 'https://api.thegraph.com/subgraphs/name/zinhunter/guilds'
const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
});

export async function MemberList(slug) {
    const query = `
     query{
        members(where: {guild: "${slug}"}) {
            member
        }
      }
    `;

    let data = await client.query({query: gql(query)});

    return data;
}

export async function GuildsByUser(user) {
    const query = `
     query{
        members(where: {member: "${user}"}) {
            member
        }
      }
    `;

    let data = await client.query({query: gql(query)});

    return data;
}