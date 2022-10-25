/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

/**
 *
 * @author 12189504
 */
public class ArrivalEvent extends Event {

    public ArrivalEvent(int time) {
        super(time);
    }

    @Override
    public void process(ShopModel shopModel, IScheduler scheduler) {
        final int GROUPSIZE = 2;

        int nextId = shopModel.getNextId();
        CustomerGroup cg = new CustomerGroup(nextId, GROUPSIZE, getTime());

        shopModel.logGroup(cg);        

        System.out.println("t= " + getTime() + ": group " + nextId + "<" + GROUPSIZE + "people> arrived");


//        scheduler.schedule(new ArrivalEvent(getTime() + 2));
        
        if(shopModel.canSeat(getTime(), cg) == true){
            System.out.println("t ="+getTime()+ ": Group "+ nextId+" Seated");
//            int numServed = shopModel.getNumServed();
            shopModel.addGroup(cg);
            scheduler.schedule(new OrderEvent((getTime() +1), cg));       

        }else{
            System.out.println("t ="+getTime()+ ": Group "+cg.getId()+" leaves as there are insufficient seats for the group");
//            int lostBusiness = shopModel.getLostBusiness();
        }
        

        scheduler.schedule(new ArrivalEvent(getTime() + 2));
        
    }
}
