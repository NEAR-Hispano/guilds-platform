import { near, log, BigInt, json, JSONValueKind, JSONValue } from "@graphprotocol/graph-ts";
import { Member, Guild } from "../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;

  for (let i = 0; i < actions.length; i++) {
    
    handleAction(
      actions[i], 
      receipt.receipt, 
      receipt.block.header,
      receipt.outcome,
      receipt.receipt.signerPublicKey
      );
  }
}

class GuildLog {
  result: string;
  method: string;
  guild: string;
  user: string;
  message: string;
  log: string;

  constructor(){

    this.result = "";
    this.method = "";
    this.guild = "";
    this.user = "";
    this.message = "";
    this.log = "";
  }
}

function createGuildLog(value: string): GuildLog{
  let obj = json.fromString(value).toObject();
  let newLog = new GuildLog();
  
  //It has to be written this way... ternary operator doesn't work
  let res = obj.get("result");
  if(res != null){
    newLog.result = res.toString();
  }

  let met = obj.get("method");
  if(met != null){
    newLog.method = met.toString();
  }

  let gld = obj.get("guild");
  if(gld != null){
    newLog.guild = gld.toString();
  }

  let usr = obj.get("user");
  if(usr != null){
    newLog.user = usr.toString();
  }

  let msg = obj.get("message");
  if(msg != null){
    newLog.message = msg.toString();
  }
  newLog.log = value;

  return newLog;

}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome,
  publicKey: near.PublicKey
): void {
  
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }
  
  const functionCall = action.toFunctionCall();

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "join_guild") {
    let result: GuildLog;

    const receiptId = receipt.id.toBase58();

      // Maps the formatted log to the LOG entity
      let members = new Member(`${receiptId}`);

      // Standard receipt properties
      members.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      members.blockHeight = BigInt.fromU64(blockHeader.height)
      members.blockHash = blockHeader.hash.toBase58()
      members.predecessorId = receipt.predecessorId
      members.receiverId = receipt.receiverId
      members.signerId = receipt.signerId
      members.signerPublicKey = publicKey.bytes.toBase58()
      members.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      members.tokensBurned = outcome.tokensBurnt
      members.outcomeId = outcome.id.toBase58()
      members.executorId = outcome.executorId
      members.outcomeBlockHash = outcome.blockHash.toBase58()

      if(outcome.logs != null && outcome.logs.length > 0){
        for(let i = 0; i < outcome.logs.length; i++){
          result = createGuildLog(outcome.logs[i]);

          if(result.method == "join_guild" && result.result == "error"){
            return;
          }
        }
        members.log = result.log;
        members.member = result.user;
        members.guild = result.guild;
      }

      members.save()
      
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "create_guild") {
    let result: GuildLog;
    const receiptId = receipt.id.toBase58();

      // Maps the formatted log to the LOG entity
      let guilds = new Guild(`${receiptId}`);

      // Standard receipt properties
      guilds.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      guilds.blockHeight = BigInt.fromU64(blockHeader.height)
      guilds.blockHash = blockHeader.hash.toBase58()
      guilds.predecessorId = receipt.predecessorId
      guilds.receiverId = receipt.receiverId
      guilds.signerId = receipt.signerId
      guilds.signerPublicKey = publicKey.bytes.toBase58()
      guilds.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      guilds.tokensBurned = outcome.tokensBurnt
      guilds.outcomeId = outcome.id.toBase58()
      guilds.executorId = outcome.executorId
      guilds.outcomeBlockHash = outcome.blockHash.toBase58()
      
      if(outcome.logs != null && outcome.logs.length > 0){
        for(let i = 0; i < outcome.logs.length; i++){
          result = createGuildLog(outcome.logs[i]);

          if(result.method == "create_guild" && result.result == "error"){
            return;
          }
        }
        guilds.log = result.log;
        guilds.guild = result.guild;
      }

      guilds.save()
      
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

}
