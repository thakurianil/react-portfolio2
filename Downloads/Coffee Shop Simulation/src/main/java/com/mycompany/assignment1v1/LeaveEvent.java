/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

/**
 *
 * @author anilkhand
 */
public class LeaveEvent extends Event {

    private final CustomerGroup customerGroup;

    public LeaveEvent(int time, CustomerGroup customerGroup) {
        super(time);
        this.customerGroup = customerGroup;

    }

    @Override
    public void process(ShopModel shopModel, IScheduler scheduler) {

        shopModel.leave(getTime(), customerGroup);
        
    }

}
