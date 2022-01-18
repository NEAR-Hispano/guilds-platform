import axios from 'axios';
import { MAIN_GUILDS } from 'variables/Constants';

export const GuildsEntities = () => {
   return axios.get('https://raw.githubusercontent.com/near/ecosystem/main/entities.json', {
            responseType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        })
        .then(response => {
            /**
             *  slug: "skyward-finance"
                title: "Skyward Finance"
                oneliner: "Enable fair token distribution and price discovery for projects built on NEAR Protocol."
                website: "https://skyward.finance/"
                app: "https://app.skyward.finance/"
                whitepaper: "https://skyward.finance/whitepaper/"
                twitter: "https://twitter.com/skywardfinance"
                telegram: "https://t.me/skywardfinance"
                discord: "https://discord.gg/KKjQwCRvbV"
                medium: "https://medium.com/nearprotocol/everything-you-need-to-know-about-skyward-finance-before-the-first-token-sale-6e82fe305e1a"
                github: "https://github.com/skyward-finance/"
                ticker: "SKYWARD"
                logo: /img/skywardfinancelogo.png
                category: defi, app
                status: launched
                contract: skyward.near
             */
            const guilds = response.data.map(data => {
                return ({
                    slug: data.slug,
                    title: data.title,
                    oneliner: data.oneliner,
                    website: data.website,
                    app: data.app,
                    whitepaper: data.whitepaper,
                    twitter: data.twitter,
                    telegram: data.telegram,
                    discord: data.discord,
                    medium: data.medium,
                    github: data.github,
                    ticker: data.ticker,
                    logo: getValidateURLLogo(data.logo),
                    category: data.category,
                    status: data.status,
                    contract: data.contract
                })
            });
            return guilds;
        })
        .catch( error => {
            console.log(error);
            return [];
            
        }
    );
}

const getValidateURLLogo = (urlLogo) => {
    //Return default logo when this is not
    if(!urlLogo){
        return require("assets/img/logo-nf.png").default;
    }

    //Remove spaces contained before and after the text
    const urlWOSpaces = urlLogo?.trim();
    if(urlWOSpaces.startsWith('/img')){
        return `https://github.com/near/ecosystem/blob/main${urlWOSpaces}?raw=true`;
    } else if(urlWOSpaces.startsWith('img')){
        //Adding a slash sign that is missing for the route
        return `https://github.com/near/ecosystem/blob/main/${urlWOSpaces}?raw=true`;;
    } else {
        //Return the same url entered
        return urlWOSpaces;
    }
}

export const getMainGuilds = (data) => {
    return data.filter( element => MAIN_GUILDS.includes(element.slug));
}

export const getMoreGuilds = (data) => {
    return data.filter( element => !MAIN_GUILDS.includes(element.slug));
}

export const getInfoSlug = (guilds, slug) => {
    return guilds.find(guild => guild.slug === slug ) 
}