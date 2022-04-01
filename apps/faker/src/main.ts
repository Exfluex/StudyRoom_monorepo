import * as fs from 'fs';
import { roomGenerator, userGenerator } from "./app/faker";
require('dotenv').config();


interface Chain{
  chain_name:string;
  ():void;
}
const ChainGenerator = (name:string,fn:()=>void)=>{
  let chain = <Chain>fn;
  chain.chain_name = name;
  return chain;
}
class CableCar{
  private chain:Chain[]=[];
  async run(){
    for await (const chain of this.chain) {
      console.log(`${chain.chain_name}[start]\n`)
      chain();
      console.log(`\n${chain.chain_name}[end]\n`)
    }
  }
  static gen(){
    return new CableCar();
  }
  set(name,fn:()=>void){
    this.chain.push(ChainGenerator(name,fn));
    return this;
  }
}

CableCar.gen().set("SyncPrismaSchema",()=>{
  console.log(process.cwd());
  fs.copyFileSync(process.env.PRISMA_SCHEMA_LOC,process.env.PRISMA_SCHEMA_TAR);
}).set("GenerateUsers",()=>{
  // userGenerator();
}).set("GenerateRooms",()=>{
  // roomGenerator();
}).run();



