/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

import java.io.PrintWriter;
import java.util.ArrayList;

/**
 *
 * @author 12189504
 */
public class ShopModel {

    private int nextId = 0;
    private int numGroup;
    private int numSeats;
    private int lostBusiness = 0;
    private int numServed = 0;
    
    
    private ArrayList<CustomerGroup> groups = new ArrayList<CustomerGroup>();
    private ArrayList<CustomerGroup> history = new ArrayList<CustomerGroup>();

    public ShopModel(int numSeats) {
        this.numSeats = numSeats;
    }
    
    public void addGroup(CustomerGroup customerGroup) {
        groups.add(customerGroup);
    }

    public void logGroup(CustomerGroup customerGroupLog) {
        history.add(customerGroupLog);
    }
    
    
    public int getNextId() {
        return nextId++;
    }

    public void showGroups(PrintWriter p) {
        p.println();
        p.println("The following groups are in the shop:");
        p.println("======================================");
        for (CustomerGroup g : groups) {
            p.println(g);
        }
        System.out.println();

    }

    public void showLog(PrintWriter p) {
        p.println("The following groups are in the history/log:");
        p.println("=============================================");
        for (CustomerGroup h : history) {
            p.println(h);
        }
    }
    
    public boolean canSeat(int time, CustomerGroup group){
        if ((numSeats >= group.getNumberInGroup())){
           numSeats = numSeats - group.getNumberInGroup();
//            System.out.println("t ="+time+ ": Group "+ group.getId()+" Seated");
//            getNumServed();
//            System.out.println(getNumServed());
           return true;
        }else{
//            System.out.println("t ="+time+ ": Group "+group.getId()+" leaves as there are insufficient seats for the group");
            lostBusiness = lostBusiness + group.getNumberInGroup();
//            System.out.println(getLostBusiness());
            return false;
           
        }
    
    }

    public int getNumServed() {
        return numServed;
    }

    public int getLostBusiness() {
        return lostBusiness;
    }
    

    public void serveOrder(int time, CustomerGroup customerGroupOrder) {
        System.out.println(time + ": Order served for group " + customerGroupOrder.getId());
        this.numServed = customerGroupOrder.getNumberInGroup() + this.numServed;
        
    }

    public void leave(int time, CustomerGroup customerGroupLeave) {

        System.out.println("t= " + time + ":Group " + customerGroupLeave.getId() + " leaves");

        numSeats = numSeats + customerGroupLeave.getNumberInGroup();
               
        groups.remove(customerGroupLeave);
    
        numGroup--;
//        System.out.println(numGroup);

    }
}
