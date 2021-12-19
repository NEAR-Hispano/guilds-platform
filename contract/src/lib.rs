use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, setup_alloc, AccountId};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::collections::UnorderedMap;
use std::collections::HashSet;

use std::convert::From;

setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct GuildsPlatform {
    guilds: UnorderedMap<String, UpgradableGuild>,
}

//Initializing the contract
impl Default for GuildsPlatform {
    fn default() -> Self {
      Self {
        guilds: UnorderedMap::new(b"g".to_vec()),
      }
    }
  }

/// Default trait for Guild
impl Default for Guild {
    fn default() -> Self {
        new_guild()
    }
}

/// Default trait for UpgradableGuild
impl Default for UpgradableGuild {
    fn default() -> Self {
        UpgradableGuild::CurrentVersion(new_guild())
    }
}


//Implementation for upgradable contract
#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum UpgradableGuild {
    CurrentVersion(Guild),
}

impl From<UpgradableGuild> for Guild {
    fn from(guild: UpgradableGuild) -> Self {
        match guild {
            UpgradableGuild::CurrentVersion(guild) => guild,  
        }
    }
}

#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Guild {
    pub slug: String,
    pub title: String,
    pub oneliner: String,
    pub website: String,
    pub app: String,
    pub whitepaper: String,
    pub twitter: String,
    pub telegram: String,
    pub discord: String,
    pub medium: String,
    pub github: String,
    pub ticker: String,
    pub logo: String,
    pub contract_str: String,
    pub youtube: String,
    pub members: HashSet<AccountId>,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum GuildStatus {
    Launched,
    NotLaunched,
}

#[near_bindgen]
impl GuildsPlatform {
    pub fn create_guild(
        &mut self, 
        slug: String,
        title: String,
        oneliner: String,
        website: String,
        app: String,
        whitepaper: String,
        twitter: String,
        telegram: String,
        discord: String,
        medium: String,
        github: String,
        ticker: String,
        logo: String,
        youtube: String,
        contract_str: String,
    ){
        let guild = UpgradableGuild::CurrentVersion(Guild {
            slug: String::from(&slug),
            title: String::from(&title),
            oneliner: String::from(&oneliner),
            website: String::from(&website),
            app: String::from(&app),
            whitepaper: String::from(&whitepaper),
            twitter: String::from(&twitter),
            telegram: String::from(&telegram),
            discord: String::from(&discord),
            medium: String::from(&medium),
            github: String::from(&github),
            ticker: String::from(&ticker),
            logo: String::from(&logo),
            contract_str: String::from(&contract_str),
            youtube: String::from(&youtube),
            members: HashSet::new(),
        });

        self.guilds.insert(&slug, &guild);

        env::log(format!("Saving guild '{}'", &slug,).as_bytes());
    }

    pub fn get_guild_info(&self, slug: String) -> Guild {
        let guild: Guild = self.guilds.get(&slug).unwrap().into();

        return guild
    }

    pub fn join_guild(&mut self, slug: String) {

        //TO DO: Control over joining? Can anyone join?
        //TO DO: On boarding of people with no account.
        let mut guild: Guild = self.guilds.get(&slug).unwrap().into();
        let account_to_insert = env::predecessor_account_id();
        
        if guild.members.get(&account_to_insert).is_none() {
            guild.members.insert(account_to_insert);
            self.guilds.insert(&slug,&UpgradableGuild::CurrentVersion(guild));
            env::log(format!("'{}' just joined '{}'!", env::predecessor_account_id(), &slug,).as_bytes());
        }
        else{
            env::log(format!("'{}' is already a member of '{}'!", account_to_insert, &slug,).as_bytes());
        }
        //TO DO: Recieve an NFT to confirm joining the guild?
    }

    pub fn get_num_members(&self, slug: String) -> usize {
        let guild: Guild = self.guilds.get(&slug).unwrap().into();

        guild.members.len()
    }

    /// Returns true if the guild exists
    pub fn guild_exists(&self, slug: &String) ->bool {
        match self.guilds.get(&slug) {
            Some(value) => {
                let log_message = format!("Guild exists {:?}", value);
                env::log(log_message.as_bytes());
                true
            },
            None => false
        }
    }

    /// Returns true if the current account is member of the Guild
    pub fn check_if_member(&self, slug: String) -> bool {
        let guild: Guild;
        match self.guild_exists(&slug) {
            //true => let guild: Guild = self.guilds.get(&slug).expect("Guild does not exist").into();
            true => guild = self.guilds.get(&slug).unwrap_or_default().into(),
            false => {
                let msg = format!("Guild {} does not exist", slug);
                env::log(msg.as_bytes());
                return false;
            }
        }

        match guild.members.get(&env::predecessor_account_id()) {
            Some(_member) => true,
            None => false,
        }
    }
}

/// Returns an empty Guild
/// TODO: Create a new "Constructor" trait?
pub fn new_guild() -> Guild {
    env::log(format!("Emplty guild created ").as_bytes());
    Guild {
        slug: String::from(""),
        title: String::from(""),
        oneliner: String::from(""),
        website: String::from(""),
        app: String::from(""),
        whitepaper: String::from(""),
        twitter: String::from(""),
        telegram: String::from(""),
        discord: String::from(""),
        medium: String::from(""),
        github: String::from(""),
        ticker: String::from(""),
        logo: String::from(""),
        contract_str: String::from(""),
        youtube: String::from(""),
        members: HashSet::new(),
    }
}

