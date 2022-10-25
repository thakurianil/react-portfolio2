/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

/**
 *
 * @author anilkhand
 */
public class OrderEvent extends Event {

    private final CustomerGroup group;

    public OrderEvent(int time, CustomerGroup group) {
        super(time);
        this.group = group;

    }

    @Override
    public void process(ShopModel shopModel, IScheduler scheduler) {
        

        shopModel.serveOrder(getTime(), group);

        scheduler.schedule(new LeaveEvent((getTime() + 10), group));

    }

}
