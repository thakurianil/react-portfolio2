/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

/**
 *
 * @author 12189504
 */
public class CustomerGroup {

    private final int id;
    private final int numberInGroup;
    private final int arrivalTime;

    public CustomerGroup(int id, int number, int time) {
        this.id = id;
        this.numberInGroup = number;
        this.arrivalTime = time;
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @return the numberInGroup
     */
    public int getNumberInGroup() {
        return numberInGroup;
    }

    /**
     * @return the arrivalTime
     */
    public int getArrivalTime() {
        return arrivalTime;
    }

    @Override
    public String toString() {
        return String.format("Group %d (%d people) arrived at t = %d", this.id,
                this.numberInGroup, this.arrivalTime);
    }
}
